/**
 * Swizzled DocCard layout: horizontal row with thumbnail left, title + description right.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Heading from '@theme/DocCard/Heading';
import Description from '@theme/DocCard/Description';
import styles from './styles.module.css';

function Container({className, href, children}) {
  return (
    <Link
      href={href}
      className={clsx(
        'card',
        ThemeClassNames.docs.docCard.container,
        styles.cardContainer,
        className,
      )}>
      {children}
    </Link>
  );
}

export default function DocCardLayout({
  item,
  className,
  href,
  icon,
  title,
  description,
  thumbnail,
}) {
  const hasThumb = Boolean(thumbnail);
  return (
    <Container href={href} className={className}>
      <div className={clsx(styles.row, hasThumb ? styles.rowHorizontal : styles.rowStacked)}>
        {hasThumb ? (
          <div className={styles.thumbWrap} aria-hidden>
            <img className={styles.thumbImg} src={thumbnail} alt="" loading="lazy" decoding="async" />
          </div>
        ) : null}
        <div className={styles.textCol}>
          <Heading item={item} icon={hasThumb ? undefined : icon} title={title} />
          {description ? <Description item={item} description={description} /> : null}
        </div>
      </div>
    </Container>
  );
}
