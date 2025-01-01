import { getAllTags, getPostsByTag } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatTagForUrl, isTagMatch } from '@/lib/tags';

type Props = {
  params: Promise<{ tag: string }>;
};

// タグの元の大文字小文字を取得する関数
async function getOriginalCaseTag(urlFormattedTag: string): Promise<string> {
  const allTags = await getAllTags();
  // URLフォーマットされた形式で比較
  return allTags.find(tag => isTagMatch(tag, urlFormattedTag)) || urlFormattedTag;
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const originalCase = await getOriginalCaseTag(decodedTag);
  return {
    title: `${originalCase}の記事一覧 - tech.jugoya.ai`,
    description: `tech.jugoya.aiの${originalCase}に関する記事一覧です。`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({ 
    tag: formatTagForUrl(tag)
  }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const originalCaseTag = await getOriginalCaseTag(decodedTag);
  const posts = await getPostsByTag(originalCaseTag);

  if (!originalCaseTag || posts.length === 0) {
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
            {originalCaseTag}
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
            <div className="p-6">
              {/* 記事タイトルと説明のリンク */}
              <div className="mb-4">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                    {post.meta.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {post.meta.description}
                  </p>
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <time
                  dateTime={post.meta.publishedAt}
                  className="text-sm text-gray-500 dark:text-gray-500"
                >
                  {new Date(post.meta.publishedAt).toLocaleDateString('ja-JP')}
                </time>
                <div className="flex gap-2">
                  {post.meta.tags.map(t => (
                    <Link
                      key={t}
                      href={`/tags/${formatTagForUrl(t)}`}
                      className={`
                        text-sm px-2 py-1 rounded-full
                        ${t === originalCaseTag
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }
                        hover:opacity-80 transition-opacity
                      `}
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}