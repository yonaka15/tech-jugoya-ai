import { type FC } from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { defaultMetadata } from '@/types/metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Blog Posts | tech.jugoya.ai',
  description: 'tech.jugoya.aiの技術記事一覧です。',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Blog Posts | tech.jugoya.ai',
    description: 'tech.jugoya.aiの技術記事一覧です。',
    url: `${siteConfig.url}/blog`,
  },
};

const BlogPage: FC = async () => {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="block"
          >
            <article className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">{post.meta.title}</h2>
              <p className="text-gray-600 mb-4">{post.meta.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.meta.tags.map(tag => (
                    <span key={`${post.slug}-${tag}`} className="px-2 py-1 bg-gray-100 text-sm rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-sm text-gray-500" dateTime={post.meta.publishedAt}>
                  {new Date(post.meta.publishedAt).toLocaleDateString('ja-JP')}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;