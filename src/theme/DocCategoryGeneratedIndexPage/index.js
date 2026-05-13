/**
 * Swizzled DocCategoryGeneratedIndexPage: hero + article grid layout for
 * a more professional category landing page (replaces the default
 * DocCardList-only render).
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {PageMetadata, useThemeConfig} from '@docusaurus/theme-common';
import {
  useCurrentSidebarCategory,
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import isInternalUrl from '@docusaurus/isInternalUrl';
import docThumbnails from '@site/src/data/docThumbnails.json';
import styles from './styles.module.css';

function findThumbnailForCategory(item) {
  const stack = [...(item.items ?? [])];
  while (stack.length) {
    const cur = stack.shift();
    if (cur?.type === 'link' && cur.docId && docThumbnails[cur.docId]) {
      return docThumbnails[cur.docId];
    }
    if (cur?.type === 'category' && cur.items?.length) {
      stack.push(...cur.items);
    }
  }
  return null;
}

function CardLinkArticle({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const thumbnail = item.docId ? docThumbnails[item.docId] ?? null : null;
  const description = item.description ?? doc?.description ?? '';
  return (
    <Link className={styles.card} to={item.href} aria-label={item.label}>
      {thumbnail ? (
        <div className={styles.cardMedia}>
          <img
            className={styles.cardThumb}
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className={clsx(styles.cardMedia, styles.cardMediaPlaceholder)} aria-hidden>
          <span className={styles.cardPlaceholderGlyph}>
            {isInternalUrl(item.href) ? '✦' : '↗'}
          </span>
        </div>
      )}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{item.label}</h3>
        {description ? <p className={styles.cardDesc}>{description}</p> : null}
        <span className={styles.cardCta} aria-hidden>
          阅读全文
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14m0 0-6-6m6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function CardCategoryArticle({item}) {
  const href = findFirstSidebarItemLink(item);
  if (!href) return null;
  const thumbnail = findThumbnailForCategory(item);
  const flatItems = item.items ?? [];
  const articleCount = flatItems.filter((x) => x.type === 'link').length;
  const description =
    item.description ||
    (articleCount > 0 ? `${articleCount} 篇相关攻略` : '点击查看子目录');
  return (
    <Link className={styles.card} to={href} aria-label={item.label}>
      {thumbnail ? (
        <div className={styles.cardMedia}>
          <img
            className={styles.cardThumb}
            src={thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span className={styles.cardBadge}>子栏目 · {articleCount} 篇</span>
        </div>
      ) : (
        <div className={clsx(styles.cardMedia, styles.cardMediaPlaceholder)} aria-hidden>
          <span className={styles.cardPlaceholderGlyph}>🗂</span>
          <span className={styles.cardBadge}>子栏目 · {articleCount} 篇</span>
        </div>
      )}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{item.label}</h3>
        {description ? <p className={styles.cardDesc}>{description}</p> : null}
        <span className={styles.cardCta} aria-hidden>
          展开栏目
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14m0 0-6-6m6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function CardItem({item}) {
  if (item.type === 'category') return <CardCategoryArticle item={item} />;
  if (item.type === 'link') return <CardLinkArticle item={item} />;
  return null;
}

function PageContent({categoryGeneratedIndex}) {
  const category = useCurrentSidebarCategory();
  const items = category.items ?? [];
  const articleCount = items.reduce((acc, it) => {
    if (it.type === 'link') return acc + 1;
    if (it.type === 'category') {
      const sub = (it.items ?? []).filter((x) => x.type === 'link').length;
      return acc + sub;
    }
    return acc;
  }, 0);

  return (
    <div className={styles.page}>
      <DocVersionBanner />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <DocBreadcrumbs />
          <DocVersionBadge />
          <p className={styles.heroEyebrow}>
            漂哥出海之路 · {articleCount > 0 ? `${articleCount} 篇攻略` : '栏目首页'}
          </p>
          <Heading as="h1" className={styles.heroTitle}>
            {categoryGeneratedIndex.title}
          </Heading>
          {categoryGeneratedIndex.description ? (
            <p className={styles.heroLead}>{categoryGeneratedIndex.description}</p>
          ) : null}
        </div>
      </header>

      <article className={styles.body}>
        <div className={styles.grid}>
          {items.map((it, idx) => (
            <CardItem key={idx} item={it} />
          ))}
        </div>
      </article>

      <footer className={styles.footerNav}>
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props) {
  const {categoryGeneratedIndex} = props;
  return (
    <>
      <PageMetadata
        title={categoryGeneratedIndex.title}
        description={categoryGeneratedIndex.description}
        keywords={categoryGeneratedIndex.keywords}
        image={useBaseUrl(categoryGeneratedIndex.image)}
      />
      <PageContent categoryGeneratedIndex={categoryGeneratedIndex} />
    </>
  );
}
