/**
 * Swizzled DocCard: passes thumbnail URL from generated docThumbnails map
 * (first image in article, else third) for left-thumb layout in Layout.
 */
import React from 'react';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Layout from '@theme/DocCard/Layout';
import docThumbnails from '@site/src/data/docThumbnails.json';

function getFallbackEmojiIcon(item) {
  if (item.type === 'category') {
    return '🗃';
  }
  return isInternalUrl(item.href) ? '📄️' : '🔗';
}

function getIconTitleProps(item) {
  const extracted = extractLeadingEmoji(item.label);
  const emoji = extracted.emoji ?? getFallbackEmojiIcon(item);
  return {
    icon: emoji,
    title: extracted.rest.trim(),
  };
}

function findThumbnailForCategory(item) {
  const stack = [...(item.items ?? [])];
  while (stack.length) {
    const cur = stack.shift();
    if (cur.type === 'link' && cur.docId && docThumbnails[cur.docId]) {
      return docThumbnails[cur.docId];
    }
    if (cur.type === 'category' && cur.items?.length) {
      stack.push(...cur.items);
    }
  }
  return null;
}

function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  if (!href) {
    return null;
  }
  const thumbnail = findThumbnailForCategory(item);
  return (
    <Layout
      item={item}
      className={item.className}
      href={href}
      thumbnail={thumbnail}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      {...getIconTitleProps(item)}
    />
  );
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const thumbnail = item.docId ? docThumbnails[item.docId] ?? null : null;
  return (
    <Layout
      item={item}
      className={item.className}
      href={item.href}
      thumbnail={thumbnail}
      description={item.description ?? doc?.description}
      {...getIconTitleProps(item)}
    />
  );
}

export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
