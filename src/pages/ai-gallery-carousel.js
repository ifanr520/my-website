import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const galleryImages = [
  {
    src: '/img/gallery/QQ20260511-023044.jpg',
    alt: 'AI 美女 01',
    title: 'AI 美女写真系列一',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-023908.jpg',
    alt: 'AI 美女 02',
    title: 'AI 美女写真系列二',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-023921.jpg',
    alt: 'AI 美女 03',
    title: 'AI 美女写真系列三',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-023933.jpg',
    alt: 'AI 美女 04',
    title: 'AI 美女写真系列四',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-023950.jpg',
    alt: 'AI 美女 05',
    title: 'AI 美女写真系列五',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-024006.jpg',
    alt: 'AI 美女 06',
    title: 'AI 美女写真系列六',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-042645.jpg',
    alt: 'AI 美女 07',
    title: 'AI 美女写真系列七',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-042703.jpg',
    alt: 'AI 美女 08',
    title: 'AI 美女写真系列八',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-042719.jpg',
    alt: 'AI 美女 09',
    title: 'AI 美女写真系列九',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-042751.jpg',
    alt: 'AI 美女 10',
    title: 'AI 美女写真系列十',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-042928.jpg',
    alt: 'AI 美女 11',
    title: 'AI 美女写真系列十一',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
  {
    src: '/img/gallery/QQ20260511-042945.jpg',
    alt: 'AI 美女 12',
    title: 'AI 美女写真系列十二',
    link: '/docs/ai-gallery/creative-guides/gallery',
  },
];

function CarouselSection() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>AI 美女相册轮播</h1>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={500}
        emulateTouch={true}
        swipeable={true}
        dynamicHeight={false}
        onClickItem={(index) => {
          window.location.href = galleryImages[index].link;
        }}
      >
        {galleryImages.map((image, index) => (
          <div key={index} style={{ cursor: 'pointer' }}>
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
            <div
              style={{
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '0 0 12px 12px',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <p style={{ margin: 0, fontSize: '18px' }}>{image.title}</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                点击进入完整相册 →
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link
          className="button button--primary button--lg"
          to="/docs/ai-gallery/creative-guides/gallery"
        >
          查看完整 AI 美女相册
        </Link>
      </div>
    </div>
  );
}

export default function AiGalleryCarousel() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="AI 美女相册轮播" description={siteConfig.tagline}>
      <main style={{ background: '#f5f5f5', minHeight: '100vh', padding: '40px 20px' }}>
        <CarouselSection />
      </main>
    </Layout>
  );
}
