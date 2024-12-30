import { getPost } from '@/lib/blog';
import BlockRenderer from '@/components/blog/blocks/BlockRenderer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Not Found | tech.jugoya.ai',
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: `${post.meta.title} | tech.jugoya.ai`,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
          <p className="text-gray-600 mb-4">{post.meta.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {post.meta.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-sm rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <time dateTime={post.meta.publishedAt}>
                公開: {new Date(post.meta.publishedAt).toLocaleDateString('ja-JP')}
              </time>
              {post.meta.updatedAt && (
                <>
                  <br />
                  <time dateTime={post.meta.updatedAt}>
                    更新: {new Date(post.meta.updatedAt).toLocaleDateString('ja-JP')}
                  </time>
                </>
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