import { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/blog'
import { formatTagForUrl } from '../lib/tags'

/**
 * サイトマップを生成する
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 全記事を取得
  const posts = await getAllPosts()
  
  // 基本URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tech.jugoya.ai'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // ブログ記事のURL
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.meta.updatedAt || post.meta.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    // タグページのURL
    ...Array.from(new Set(posts.flatMap((post) => post.meta.tags))).map((tag) => ({
      url: `${baseUrl}/tags/${formatTagForUrl(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
  ]
}