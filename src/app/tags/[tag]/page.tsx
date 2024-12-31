import { getAllTags, getPostsByTag } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag}の記事一覧 - tech.jugoya.ai`,
    description: `tech.jugoya.aiの${decodedTag}に関する記事一覧です。`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  const validTags = [];
  
  for (const tag of tags) {
    const posts = await getPostsByTag(tag);
    if (posts.length > 0) {
      validTags.push({ tag: encodeURIComponent(tag) });
    }
  }
  
  return validTags;
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  // 記事が0件の場合は404を返す
  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← タグ一覧に戻る
        </Link>
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full text-blue-800 dark:text-blue-200">
            {decodedTag}
          </span>
          <span className="text-2xl text-gray-600 dark:text-gray-400">
            の記事一覧
          </span>
        </h1>
      </div>

      <div className="grid gap-6">
        {posts.map(post => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {post.meta.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.meta.description}
                </p>
                <div className="flex items-center gap-4">
                  <time
                    dateTime={post.meta.publishedAt}
                    className="text-sm text-gray-500 dark:text-gray-500"
                  >
                    {new Date(post.meta.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                  <div className="flex gap-2">
                    {post.meta.tags.map(t => (
                      <span
                        key={t}
                        className={`
                          text-sm px-2 py-1 rounded-full
                          ${t === decodedTag
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }
                        `}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}