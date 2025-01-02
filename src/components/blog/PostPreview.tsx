'use client';

import Link from 'next/link';
import { formatTagForUrl } from '@/lib/tags';
import { type PostWithSlug } from '@/lib/blog';

export default function PostPreview({ post }: { post: PostWithSlug }) {
  return (
    <article className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link 
        href={`/blog/${post.slug}`}
        className="block mb-4"
      >
        <h2 className="text-2xl font-semibold mb-2">{post.meta.title}</h2>
        <p className="text-gray-600">{post.meta.description}</p>
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {post.meta.tags.map(tag => (
            <Link
              key={`${post.slug}-${tag}`}
              href={`/tags/${formatTagForUrl(tag)}`}
              className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {tag}
            </Link>
          ))}
        </div>
        <time className="text-sm text-gray-500" dateTime={post.meta.publishedAt}>
          {new Date(post.meta.publishedAt).toLocaleDateString('ja-JP')}
        </time>
      </div>
    </article>
  );
}