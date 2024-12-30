import { type FC } from 'react';
import { getPost } from '@/lib/blog';
import BlockRenderer from '@/components/blog/blocks/BlockRenderer';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage: FC<BlogPostPageProps> = async ({ params }) => {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
        <p className="text-gray-600 mb-8">{post.meta.description}</p>
        <div className="space-y-6">
          {post.blocks.map(block => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
