---
sidebar_label: VPS + 3X-UI 搭建
sidebar_position: 1
description: 海外 VPS 上搭建 3X-UI 面板的完整命令流程，含 SSL 证书、协议选择、Cloudflare 优选 IP 与 WARP 出口配置。
keywords:
  - VPS
  - 3X-UI
  - x-ui
  - Cloudflare WARP
  - 优选 IP
  - 小黄云
  - 反向代理
---

# 海外 VPS + 3X-UI 搭建实操：稳定使用 ChatGPT / Claude 的网络方案

{/* hero-img:start */}
![VPS 3X-UI 控制面板 · 服务器机房真实质感](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=620&fit=crop&q=85)
{/* hero-img:end */}

:::caution 使用场景声明
本文面向<strong>有合法海外业务、远程开发、跨境内容创作或科研需求</strong>的用户，搭建一套<strong>稳定访问 OpenAI / Anthropic Claude / GitHub / Google 等海外开发服务</strong>的自有网络环境。所有命令在<strong>海外 VPS 上执行</strong>。请严格遵守所在地法律法规以及 VPS 服务商 ToS，仅用于合法用途。
:::

每天用 ChatGPT 写代码、用 Claude 改文案、用 Cursor / GitHub Copilot 编程的开发者最知道——<strong>公共机场节点不稳定、共享 IP 被风控、断流 5 秒就丢上下文</strong>是日常痛点。自建一台 VPS + 3X-UI 面板是<strong>最低成本的"私有专线"</strong>方案：月成本 $3-$8，一人专享，IP 干净，再叠加 Cloudflare WARP 出口走 IP 优化，OpenAI 网页 / API 都能丝滑跑。

## 一句话结论

| 用户画像 | 推荐配置 |
|---------|---------|
| 一个人用，跑 ChatGPT / Claude 网页 | $3-$5 海外 VPS + 3X-UI + VLESS-Reality |
| 跑 GPT / Claude API（代码 / 自动化）| 同上 + WARP 出口（避免 IP 被识别）|
| 多设备共享（手机 + 电脑）| 同上 + Reality 多用户 |
| 团队 5+ 人共享 | $10+ VPS + 3X-UI + 流量统计 |

> 全文配置完成约 30 分钟，无需 Linux 经验，跟着复制命令即可。

---

## 一、VPS 选择

### 推荐服务商

| 服务商 | 价格 | 稳定性 | 备注 |
|------|------|------|------|
| **Vultr** | $3.5/月 起 | ⭐⭐⭐⭐ | 接受 PayPal / 信用卡，全球节点 |
| **DigitalOcean** | $4/月 起 | ⭐⭐⭐⭐⭐ | 教育优惠 $200，开发者首选 |
| **Linode（Akamai）** | $5/月 起 | ⭐⭐⭐⭐⭐ | 老牌稳定 |
| **BandwagonHost** | $50/年 起 | ⭐⭐⭐⭐ | 中文支持好，CN2 GIA 直连线路 |
| **AWS Lightsail** | $3.5/月 起 | ⭐⭐⭐⭐ | 首月免费，亚马逊基础设施 |
| **Hetzner** | €4/月 起 | ⭐⭐⭐⭐⭐ | 德国，性价比之王 |
| **RackNerd** | $11/年 起 | ⭐⭐⭐ | 极度便宜，但稳定性参差 |

### 选地区

| 用途 | 推荐区域 |
|------|---------|
| OpenAI / Claude 主用 | **美国西部**（洛杉矶、西雅图）|
| Cursor / GitHub | 美西 / 日本 / 新加坡 |
| 跑欧洲服务（Hetzner / EU 银行）| 德国 / 法国 |
| 香港 / 台湾节点 | ⚠️ 不推荐：OpenAI 拒绝、香港 IP 被打标 |

### 配置最低要求

- **1 vCPU / 1 GB RAM / 25 GB SSD**
- **1 TB / 月 流量**
- **Ubuntu 22.04 / 24.04 LTS**（本文以此为例）
- **公网 IPv4**（必须）

---

## 二、买完 VPS 后的初始化（5 分钟）

### 1. SSH 连接 VPS

```bash
# 你的电脑（Mac / Linux 终端 / Windows PowerShell / Termius）
ssh root@<你的VPS_IP>
# 输入 VPS 服务商发的 root 密码
```

### 2. 系统更新 + 基础工具

```bash
apt update && apt upgrade -y
apt install -y curl wget vim socat ufw
```

### 3. 修改默认 SSH 端口（防扫描）

```bash
# 把 22 改成 22222（任选 1024-65535）
sed -i 's/#Port 22/Port 22222/' /etc/ssh/sshd_config
systemctl restart sshd
```

### 4. 防火墙

```bash
ufw allow 22222/tcp     # SSH 新端口
ufw allow 80/tcp        # 证书申请
ufw allow 443/tcp       # HTTPS
ufw --force enable
```

### 5. 时区

```bash
timedatectl set-timezone Asia/Shanghai
# 或 timedatectl set-timezone UTC
```

---

## 三、一键安装 3X-UI 面板

3X-UI 是 X-UI 的活跃分支，**支持所有主流协议**（VMess / VLESS / Trojan / Shadowsocks / Reality / Hysteria2）+ 流量统计 + 多用户。

### 一键脚本（官方）

```bash
bash <(curl -Ls https://raw.githubusercontent.com/MHSanaei/3x-ui/master/install.sh)
```

脚本会询问：
- 是否设置面板用户名 / 密码：**强烈建议设**（设一个复杂的）
- 是否设置面板访问端口：**建议改成 54321 等非常用端口**
- 是否设置面板访问路径：**建议设一个随机字符串**（如 `/abc123panel`）

安装完成后：

```bash
x-ui status     # 查看运行状态
x-ui            # 进入交互菜单
```

> 面板访问地址：`http://<VPS_IP>:54321/abc123panel`

### 防火墙开端口

```bash
ufw allow 54321/tcp
```

---

## 四、申请 SSL 证书（Let's Encrypt）

证书让面板和协议都走 HTTPS，**Cloudflare CDN + 域名 + Reality 协议都需要**。

### 1. 准备域名

去 Cloudflare / Namecheap / Spaceship 买一个便宜域名（`.xyz` / `.top` 年费 $1-$3 即可）。

### 2. 域名解析到 VPS（**关键：先关 Cloudflare 橙色云**）

Cloudflare DNS 后台：
- A 记录：`vps.example.com` → 你的 VPS_IP
- 代理状态：**先选灰色云（DNS only）**，等证书申请完再开橙色云

### 3. 安装 acme.sh + 申请证书

```bash
curl https://get.acme.sh | sh -s email=your@email.com
source ~/.bashrc
acme.sh --set-default-ca --server letsencrypt

# 把域名替换为你的
acme.sh --issue -d vps.example.com --standalone --keylength ec-256

# 安装到指定目录
mkdir -p /etc/x-ui/cert
acme.sh --installcert -d vps.example.com --ecc \
  --fullchain-file /etc/x-ui/cert/fullchain.pem \
  --key-file       /etc/x-ui/cert/private.key
```

> 80 端口被占用？停掉冲突服务：`systemctl stop nginx` / `systemctl stop apache2`，证书申请完后再启动。

### 4. 在 3X-UI 面板配置证书

面板登录 → Panel Settings → Set certificate
- Cert path: `/etc/x-ui/cert/fullchain.pem`
- Key path: `/etc/x-ui/cert/private.key`
- Restart panel

之后访问改用 `https://vps.example.com:54321/abc123panel`，浏览器不再有"不安全"警告。

---

## 五、协议选择（按 X 与 Reddit 反馈）

| 协议 | 速度 | 抗封锁 | 配置难度 | 推荐场景 |
|------|----|------|------|---------|
| **VLESS + Reality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 中 | **首选**（不需要域名也能用） |
| **VLESS + WS + TLS + CDN** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 高 | 配 Cloudflare CDN，IP 可变 |
| **Trojan + WS + TLS + CDN** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 高 | 老协议，仍稳定 |
| **Hysteria2** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 中 | UDP 协议，速度快但易识别 |
| **VMess + WS + TLS** | ⭐⭐⭐ | ⭐⭐ | 中 | 老协议，已有点过时 |
| **Shadowsocks** | ⭐⭐⭐ | ⭐⭐ | 低 | 仅备用 |

### 推荐组合

```
主线：VLESS + Reality（直连，不需 CDN）
备线：VLESS + WS + TLS + Cloudflare CDN（IP 可优选）
```

两条线建议都开，主线 30Mbps+ 直连最快，备线 IP 被封时切到 CDN。

---

## 六、配置 VLESS + Reality（推荐主协议）

### 1. 在 3X-UI 面板新建入站

面板 → Inbounds → Add Inbound

```
Remark:        reality-main
Protocol:      vless
Listening IP:  0.0.0.0
Port:          443
Network:       tcp
Security:      reality
```

### 2. Reality 设置

```
Dest:           www.microsoft.com:443  # 或 www.bing.com:443 / www.cloudflare.com:443
Server Names:   www.microsoft.com,microsoft.com
Private Key:    <点 Generate 自动生成>
Public Key:     <自动从 Private Key 推导>
Short Id:       <点 Generate>
```

> Dest 选一个<strong>真实存在、TLS 1.3 + H2 支持、与你 VPS 同区域 latency 低</strong>的目标网站。`microsoft.com` / `cloudflare.com` / `apple.com` 是经典选择。

### 3. 添加客户端

Inbound → Clients → Add Client：
- Email: my-laptop（标识用，随便写）
- Subscription: 留空或自填
- Total GB: 0（不限）
- Expiry: 0（不过期）
- Limit IP: 1（一台设备同时连接）

保存后点链接图标，复制 `vless://...` 链接到客户端（V2rayN / Sing-Box / Stash / Shadowrocket / NekoBox）。

### 4. 防火墙

```bash
ufw allow 443/tcp
```

---

## 七、配置 VLESS + WS + TLS + Cloudflare CDN（备线）

### 1. 准备域名 + Cloudflare DNS（这次开橙色云）

- A 记录：`cdn.example.com` → VPS_IP
- 代理状态：**橙色云（Proxied）**

### 2. 在 3X-UI 新建入站

```
Remark:         cdn-backup
Protocol:       vless
Listening IP:   0.0.0.0
Port:           80          # 注意：经过 CF CDN 的话端口走 80/443/8080/8880/2052 等 CF 兼容端口
Network:        ws
Path:           /随机字符
HTTP Headers:   Host = cdn.example.com
Security:       none        # CF CDN 已经处理 TLS，VPS 只走 WS http
```

### 3. Cloudflare 后台设置

SSL/TLS → Overview：选 **Flexible** 或 **Full**（不要选 Strict，否则报错）

### 4. 客户端连接

```
Address:    cdn.example.com  # 域名走 CF
Port:       443              # CF 默认 HTTPS
Network:    ws
Path:       /随机字符
TLS:        true             # 客户端开 TLS（连 CF 是 HTTPS）
SNI:        cdn.example.com
```

---

## 八、Cloudflare 优选 IP（小黄云加速）

Cloudflare CDN 全球有 200+ 节点，但<strong>分配给你的边缘节点不一定最快</strong>。"优选 IP" 就是<strong>挑出离你最近、延迟最低的 CF 节点 IP</strong>，手动指定。

### 1. 在国内电脑上跑 CloudflareST

```bash
# Windows / Mac / Linux 都有版本
# https://github.com/XIU2/CloudflareSpeedTest
./CloudflareST -dn 10 -tll 100 -tl 200 -p 10
```

输出 Top 10 最快的 CF IP，例：`104.16.123.45`、`172.67.89.12` 等。

### 2. 在客户端用优选 IP

V2rayN / Stash / Shadowrocket 中：

```
Address:    104.16.123.45    # 优选 IP，替代 cdn.example.com 直连
Host:       cdn.example.com  # 真实域名走 SNI
Port:       443
Network:    ws
Path:       /随机字符
TLS:        true
SNI:        cdn.example.com
```

### 3. 优选 IP 多久换一次

- **新加坡 / 日本 / 香港**节点 IP 通常稳定 1-2 周
- **大陆电信 / 联通 / 移动** 三网最优 IP 不一致，建议每周跑一次
- 部分用户用 [api.vvhan.com/api/cf](https://api.vvhan.com/api/cf) 等公网优选 IP API 自动同步

> "小黄云"= Cloudflare 橙色云（Proxied）= CDN 中转。优选 IP 是<strong>挑选 CF CDN 最快入口节点</strong>的过程，让数据在<strong>大陆 → CF 边缘 → 你的 VPS</strong> 链路里第一段最快。

---

## 九、Cloudflare WARP 出口（解锁 OpenAI / Claude）

OpenAI / Anthropic 经常<strong>识别 VPS 数据中心 IP，限制注册 / 提问</strong>。WARP 是 Cloudflare 的 1.1.1.1 服务底层网络，**给你的 VPS 加上 Cloudflare 自有 IP 出口**，OpenAI 看到的是住宅级 IP，通过率高。

### 1. 安装 wgcf（WARP 命令行工具）

```bash
wget -O /usr/local/bin/wgcf https://github.com/ViRb3/wgcf/releases/latest/download/wgcf_2.20_linux_amd64
chmod +x /usr/local/bin/wgcf

# 注册 + 生成配置
cd /etc/wireguard
wgcf register
wgcf generate
mv wgcf-profile.conf wgcf.conf
```

### 2. 安装 WireGuard

```bash
apt install -y wireguard
```

### 3. 修改 wgcf.conf（让 WARP 仅作为出口，不影响入口）

```bash
vim /etc/wireguard/wgcf.conf
```

修改 `[Interface]` 部分：

```ini
[Interface]
PrivateKey = <自动生成的 key>
Address = 172.16.0.2/32
Address = 2606:4700:110:8a36:df92:102a:9602:fa18/128
DNS = 1.1.1.1, 2606:4700:4700::1111
MTU = 1280
Table = 51820

# 关键 PostUp/PostDown，让 WARP 只用于出口流量
PostUp = ip rule add fwmark 51820 table 51820
PostUp = ip route add default dev wgcf table 51820
PostDown = ip rule del fwmark 51820 table 51820

[Peer]
PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
AllowedIPs = 0.0.0.0/0
AllowedIPs = ::/0
Endpoint = 162.159.193.10:2408
```

### 4. 启动 WARP

```bash
wg-quick up wgcf
systemctl enable wg-quick@wgcf

# 测试是否生效
curl -s --interface wgcf https://www.cloudflare.com/cdn-cgi/trace
# 应该返回 warp=on
```

### 5. 在 3X-UI 配置出站走 WARP

面板 → Outbounds → Add Outbound：
- Tag: `warp`
- Protocol: freedom
- Settings: `{ "domainStrategy": "UseIPv4v6", "redirect": "<wgcf 接口 IP>" }`

或更简洁：直接编辑 `/usr/local/x-ui/bin/config.json`，添加路由规则把 `openai.com` / `chatgpt.com` / `anthropic.com` / `claude.ai` 域名分流到 warp 出站。

```json
{
  "routing": {
    "rules": [
      {
        "type": "field",
        "outboundTag": "warp",
        "domain": [
          "openai.com",
          "chatgpt.com",
          "anthropic.com",
          "claude.ai",
          "google.com"
        ]
      }
    ]
  }
}
```

### 6. 重启 x-ui

```bash
x-ui restart
```

---

## 十、客户端推荐

| 平台 | 推荐客户端 | 备注 |
|------|---------|------|
| **iPhone** | Shadowrocket / Stash | App Store 美区下载 |
| **安卓** | NekoBox / V2rayNG | GitHub Release |
| **Mac** | Stash / V2rayU / Sing-Box | 推荐 Stash |
| **Windows** | V2rayN / NekoBox / Sing-Box | V2rayN 最常用 |
| **Linux** | sing-box CLI | 终端控 |

把 3X-UI 生成的 `vless://` 链接<strong>扫码或粘贴</strong>到客户端即可使用。

---

## 十一、X 与 Reddit 高频踩坑

- **VPS 被 OpenAI 直接拒**：所有美西机房 VPS（DigitalOcean / Vultr / Linode 美西）IP 都进了 OpenAI 黑名单，<strong>必须配 WARP 出口</strong>
- **Reality 协议 Dest 选错**：选了 `wikipedia.org` 等支持率参差的网站，部分客户端连不上。**用 microsoft.com / cloudflare.com 最稳**
- **Cloudflare 80/443 端口被运营商 QoS**：用 8080/2052/2082/2086/2095（CF 兼容 HTTP）或 8443/2053/2083/2087/2096（HTTPS）等替代端口
- **优选 IP 几天就失效**：CF 边缘节点 IP 每周轮换；建议<strong>每周自动跑一次 CloudflareST</strong>
- **WARP 出口被 OpenAI 也封**：CF WARP 也开始被部分服务标记，可<strong>同时配 WARP+ 付费版</strong>（IP 池更大）或 IPv6 通道
- **3X-UI 升级把配置覆盖**：升级前先备份 `/etc/x-ui/x-ui.db`
- **流量翻倍**：CDN + WARP 双层会让 VPS 流量翻 2-3 倍，<strong>选不限流量套餐 / 1TB 以上</strong>
- **海外 VPS 突然没 IPv4**：部分服务商按月分配，重启后 IP 变；**重要场景选静态 IP 套餐**
- **付完 VPS 但被反欺诈**：Vultr / DO 对国内信用卡反欺诈严，建议<strong>用 BiyaPay 速捷卡 / SafePal Card / Wise USD</strong> 付款（详见 [加密银行卡攻略](/docs/category/crypto-cards)）
- **3X-UI 面板被扫描**：默认 54321 端口被 GitHub 扫描器盯上；<strong>务必改成非常用端口 + 加访问路径</strong>
- **Reality Public Key 配错**：客户端连不上时第一件事 — 检查 Public Key 是否完整复制（无空格 / 末尾无截断）
- **WARP 内网冲突**：VPS 已用了 172.16.x.x 内网时，wgcf.conf 中的 Address 改成其他网段
- **Vultr 重启后 WARP 失效**：`systemctl enable wg-quick@wgcf` 必须开开机自启

---

## 十二、推荐工具链 + 维护

| 工具 | 用途 |
|------|-----|
| **CloudflareST** | 优选 IP |
| **wgcf** | WARP 注册与配置 |
| **Termius** / **iTerm2** | SSH 客户端 |
| **Watchtower** | 自动更新 Docker 容器（如 3X-UI 用 Docker 部署）|
| **netdata** | VPS 性能监控（CPU / 内存 / 流量）|
| **Uptime Kuma** | 自建监控，VPS / 域名挂了发 Telegram 通知 |
| **Cron 定时任务** | 每天自动备份 3X-UI 配置到 GitHub 私库 |

### 备份脚本（建议每周跑一次）

```bash
# 备份 3X-UI 配置
cp /etc/x-ui/x-ui.db /root/backup/x-ui-$(date +%Y%m%d).db

# 备份证书
cp -r /etc/x-ui/cert /root/backup/cert-$(date +%Y%m%d)
```

加到 crontab：

```bash
crontab -e
# 每周日凌晨 2 点备份
0 2 * * 0 /root/backup.sh
```

---

## 总结

整套方案的核心思路：

1. **海外 VPS** = 你的私有 "出口"
2. **3X-UI 面板** = 一站式管理多协议、多用户、多设备
3. **VLESS + Reality**（主）+ **VLESS + WS + CDN**（备）= 双线冗余
4. **Cloudflare 优选 IP** = 让 CF CDN 第一段最快
5. **Cloudflare WARP 出口** = 让 OpenAI / Claude 看到住宅级 IP，避开数据中心黑名单

跟着流程跑一遍，<strong>30 分钟搞定，月成本 $3-$8</strong>，从此 ChatGPT 不掉线、Cursor / Claude API 不报 429。

> 免责声明：本文为社区反馈整理，搭建结果以实际环境为准。请遵守所在地法律法规和 VPS 服务商 ToS，仅用于合法业务、开发与学习用途。
