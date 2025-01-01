// src/app/blog/[slug]/page.tsx
import { getPost, getAllPosts } from '@/lib/blog';
import BlockRenderer from '@/components/blog/blocks/BlockRenderer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// ビルド時に生成される記事のみを許可
export const dynamicParams = false;

// ビルド時に生成する記事パスの定義
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

// メタデータの生成（型定義をNext.js 15に対応）
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Not Found | tech.jugoya.ai',
      description: 'The requested post could not be found.',
      robots: 'noindex, nofollow'
    };
  }

  const publishedTime = new Date(post.meta.publishedAt).toISOString();
  const modifiedTime = post.meta.updatedAt 
    ? new Date(post.meta.updatedAt).toISOString()
    : undefined;

  return {
    title: `${post.meta.title} | tech.jugoya.ai`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [post.meta.author],
      tags: post.meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
    },
    alternates: {
      canonical: `https://tech.jugoya.ai/blog/${resolvedParams.slug}`,
    },
  };
}

// ページコンポーネント（型定義をNext.js 15に対応）
export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.meta.publishedAt);
  const updatedDate = post.meta.updatedAt ? new Date(post.meta.updatedAt) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
          <p className="text-gray-600 mb-4">{post.meta.description}</p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.meta.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500 space-y-1">
              <div className="flex items-center gap-1">
                <time dateTime={post.meta.publishedAt}>
                  公開: {publishedDate.toLocaleDateString('ja-JP')}
                </time>
              </div>
              {updatedDate && (
                <div className="flex items-center gap-1">
                  <time dateTime={post.meta.updatedAt}>
                    更新: {updatedDate.toLocaleDateString('ja-JP')}
                  </time>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {post.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </article>
    </div>
  );
}