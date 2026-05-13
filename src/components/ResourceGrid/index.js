import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function CopyButton({code}) {
  const [copied, setCopied] = React.useState(false);
  if (!code) return null;
  return (
    <button
      type="button"
      className={styles.copyBtn}
      aria-label={`复制邀请码 ${code}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator?.clipboard) {
          navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          });
        }
      }}>
      {copied ? '已复制' : '复制'}
    </button>
  );
}

function Stars({rating = 5}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className={styles.stars} aria-label={`评分 ${rating} 分`}>
      {'★'.repeat(full)}
      {half ? '⯨' : ''}
      {'☆'.repeat(empty)}
      <span className={styles.ratingNum}>{rating.toFixed(1)}</span>
    </span>
  );
}

function ResourceCard({item}) {
  const {
    brand,
    brandColor = '#0a2540',
    brandBg = '#fef3c7',
    name,
    tags = [],
    hotBadge,
    promoBadge,
    description,
    bonus,
    inviteLabel = '邀请码',
    inviteCode,
    rating = 5,
    officialUrl,
    tutorialUrl,
    ctaLabel = '立即开通',
  } = item;

  return (
    <div className={styles.card}>
      {hotBadge ? <span className={styles.hotBadge}>{hotBadge}</span> : null}
      {promoBadge ? <span className={styles.promoBadge}>{promoBadge}</span> : null}

      {tags.length > 0 && (
        <div className={styles.tagRow}>
          {tags.map((t, i) => (
            <span
              key={i}
              className={`${styles.tag} ${
                t.includes('必开') || t.includes('热门')
                  ? styles.tagHot
                  : t.includes('华人') || t.includes('入门')
                  ? styles.tagSoft
                  : styles.tagDefault
              }`}>
              {t}
            </span>
          ))}
        </div>
      )}

      <div className={styles.head}>
        <span
          className={styles.brand}
          style={{backgroundColor: brandBg, color: brandColor}}
          aria-hidden>
          {brand}
        </span>
        <span className={styles.name}>{name}</span>
      </div>

      {description ? <p className={styles.desc}>{description}</p> : null}

      {bonus ? (
        <div className={styles.bonus}>
          <span className={styles.bonusLabel}>🎁 新人欢迎礼</span>
          <span className={styles.bonusValue}>{bonus}</span>
        </div>
      ) : null}

      <div className={styles.invite}>
        <span className={styles.inviteLabel}>{inviteLabel}</span>
        <code className={styles.inviteCode}>{inviteCode || '待填写'}</code>
        <CopyButton code={inviteCode} />
      </div>

      <Stars rating={rating} />

      <div className={styles.actions}>
        <a
          className={styles.ctaPrimary}
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer">
          {ctaLabel} →
        </a>
        {tutorialUrl ? (
          <Link className={styles.ctaSecondary} to={tutorialUrl}>
            查看教程
          </Link>
        ) : (
          <span className={`${styles.ctaSecondary} ${styles.ctaDisabled}`}>
            教程整理中
          </span>
        )}
      </div>
    </div>
  );
}

export default function ResourceGrid({emoji, title, count, description, resources = []}) {
  return (
    <section className={styles.section} aria-labelledby={`section-${title}`}>
      <header className={styles.sectionHead}>
        <h2 className={styles.sectionTitle} id={`section-${title}`}>
          <span className={styles.sectionEmoji}>{emoji}</span>
          {title}
          <span className={styles.sectionCount}>{count ?? resources.length} 个资源</span>
        </h2>
        {description ? <p className={styles.sectionDesc}>{description}</p> : null}
      </header>
      <div className={styles.grid}>
        {resources.map((r, i) => (
          <ResourceCard key={i} item={r} />
        ))}
      </div>
    </section>
  );
}
