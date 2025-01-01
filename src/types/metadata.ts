import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/**
 * サイト全体のデフォルトメタデータ設定
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.metadata.title,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [
      {
        url: '/images/og-default.png',
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.defaultAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.author.twitter,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: siteConfig.metadata.robots,
};

/**
 * ブログ記事のメタデータを生成
 */
export function generateBlogPostMetadata({
  title,
  description,
  publishedAt,
  updatedAt,
  slug,
  tags,
  author,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  slug: string;
  tags: string[];
  author: string;
}): Metadata {
  const publishedTime = new Date(publishedAt).toISOString();
  const modifiedTime = updatedAt ? new Date(updatedAt).toISOString() : undefined;
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      modifiedTime,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      authors: [author],
      images: [
        {
          url: `/blog/${slug}/opengraph-image`,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: title,
        },
      ],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.author.twitter,
      title,
      description,
      images: [`/blog/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * ブログ記事のJSON-LDを生成
 */
export function generateBlogPostJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  slug,
  tags,
  author,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  slug: string;
  tags: string[];
  author: string;
}) {
  const publishedTime = new Date(publishedAt).toISOString();
  const modifiedTime = updatedAt ? new Date(updatedAt).toISOString() : undefined;
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: author,
      url: `https://github.com/${siteConfig.author.github}`,
    },
    image: `/blog/${slug}/opengraph-image`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    keywords: tags.join(', '),
  };
}