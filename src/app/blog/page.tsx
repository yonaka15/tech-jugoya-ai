import { type FC } from 'react';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { defaultMetadata } from '@/types/metadata';
import PostPreview from '@/components/blog/PostPreview';

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
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;