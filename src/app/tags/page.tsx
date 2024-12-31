import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
  title: 'タグ一覧 - tech.jugoya.ai',
  description: 'tech.jugoya.aiのタグ一覧ページです。',
};

async function getTagsWithCount() {
  const posts = await getAllPosts();
  const tagCount = new Map<string, number>();
  
  // タグの使用回数を集計
  posts.forEach(post => {
    post.meta.tags.forEach(tag => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });
  
  // カウントが0より大きいタグのみを返す
  return Array.from(tagCount.entries())
    .filter(entry => entry[1] > 0)
    .map(entry => ({ tag: entry[0], count: entry[1] }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export default async function TagsPage() {
  const tagsWithCount = await getTagsWithCount();
  
  // タグの出現頻度に基づいてフォントサイズを計算
  const maxCount = Math.max(...tagsWithCount.map(t => t.count));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">タグ一覧</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-wrap gap-4">
          {tagsWithCount.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className={`
                inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-blue-50 dark:bg-blue-900
                hover:bg-blue-100 dark:hover:bg-blue-800
                text-blue-600 dark:text-blue-300
                transition duration-200
                ${count > maxCount / 2 ? 'font-semibold' : 'font-normal'}
              `}
              style={{
                fontSize: `${1 + (count / maxCount)}rem`,
              }}
            >
              <span>{tag}</span>
              <span className="text-sm bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-full">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}