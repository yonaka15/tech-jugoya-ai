import { getPost, getAllPosts } from "@/lib/blog";
import BlockRenderer from "@/components/blog/blocks/BlockRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { BlogPost } from "@/types/blog";
import {
  generateBlogPostMetadata,
  generateBlogPostJsonLd,
} from "@/types/metadata";
import BlogLayout from "@/components/layout/blog/BlogLayout";
import LeftSidebar from "@/components/layout/blog/LeftSidebar";
import RightSidebar from "@/components/layout/blog/RightSidebar";
import { siteConfig } from "@/config/site";

// ビルド時に生成される記事のみを許可
export const dynamicParams = false;

// ビルド時に生成する記事パスの定義
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// メタデータの生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Not Found | tech.jugoya.ai",
      description: "The requested post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return generateBlogPostMetadata({
    ...post.meta,
    slug: resolvedParams.slug,
  });
}

// ページコンポーネント
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = (await getPost(resolvedParams.slug)) as BlogPost;

  if (!post) {
    notFound();
  }

  const url = `${siteConfig.url}/blog/${resolvedParams.slug}`;

  // JSON-LDの生成
  const jsonLd = generateBlogPostJsonLd({
    ...post.meta,
    slug: resolvedParams.slug,
  });

  return (
    <BlogLayout
      leftSidebar={<LeftSidebar meta={post.meta} />}
      rightSidebar={<RightSidebar url={url} title={post.meta.title} />}
    >
      <article>
        {/* JSON-LDの追加 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
          <p className="text-gray-600 mb-4">{post.meta.description}</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-500 space-y-1">
              <div className="flex items-center gap-1">
                <time dateTime={post.meta.publishedAt}>
                  公開:{" "}
                  {new Date(post.meta.publishedAt).toLocaleDateString("ja-JP")}
                </time>
              </div>
              {post.meta.updatedAt && (
                <div className="flex items-center gap-1">
                  <time dateTime={post.meta.updatedAt}>
                    更新:{" "}
                    {new Date(post.meta.updatedAt).toLocaleDateString("ja-JP")}
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
    </BlogLayout>
  );
}

