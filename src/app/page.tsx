import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { HeroSection } from "@/components/layout/HeroSection";

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 5); // 最新5記事を取得

  // すべての記事からタグを収集し、出現回数でソート
  const tagCounts = posts.reduce((acc, post) => {
    post.meta.tags.forEach(tag => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>());

  const sortedTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20); // 上位20タグを取得

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <div className="container max-w-screen-xl mx-auto px-4 py-8">
        {/* Recent Posts Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">最新の記事</h2>
            <Link 
              href="/blog" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              すべての記事を見る →
            </Link>
          </div>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800 pb-6">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.meta.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {post.meta.description}
                </p>
                <div className="flex items-center space-x-4">
                  <time className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(post.meta.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                  <div className="flex flex-wrap gap-2">
                    {post.meta.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Tag Cloud Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">人気のタグ</h2>
          <div className="flex flex-wrap gap-3">
            {sortedTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
              >
                {tag} ({count})
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}