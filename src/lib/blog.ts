// src/lib/blog.ts
import { type BlogPost, Block } from '@/types/blog';
import fs from 'fs/promises';
import path from 'path';
import { formatTagForUrl } from './tags';

export type PostWithSlug = BlogPost & { slug: string };

// メモリキャッシュの型定義
type PostCache = {
  posts: Map<string, BlogPost>;
  allPosts: PostWithSlug[] | null;
  tags: Set<string> | null;
  taggedPosts: Map<string, PostWithSlug[]>;
  lastUpdated: number;
};

// グローバルキャッシュオブジェクト
const cache: PostCache = {
  posts: new Map(),
  allPosts: null,
  tags: null,
  taggedPosts: new Map(),
  lastUpdated: 0,
};

// キャッシュの有効期限（開発環境では短く、本番では長く）
const CACHE_TTL = process.env.NODE_ENV === 'development' ? 5000 : 3600000; // 開発: 5秒, 本番: 1時間

// キャッシュが有効かどうかをチェック
function isCacheValid(): boolean {
  return Date.now() - cache.lastUpdated < CACHE_TTL;
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  } catch (error) {
    console.error(`Failed to check if path is directory: ${path}`, error);
    return false;
  }
}

// BlockIDを生成するユーティリティ関数
function generateBlockId(filePath: string, blockId: string): string {
  const prefix = path.basename(filePath, '.json').replace(/\//g, '_');
  return `${prefix}_${blockId}`;
}

// 単一の記事ファイルを読み込む
async function loadSinglePostFile(jsonPath: string): Promise<BlogPost | null> {
  try {
    const fileContent = await fs.readFile(jsonPath, 'utf-8');
    const post = JSON.parse(fileContent) as BlogPost;
    
    const resolvedBlocks = post.blocks.map(block => ({
      ...block,
      id: generateBlockId(jsonPath, block.id)
    }));

    return {
      ...post,
      blocks: resolvedBlocks
    };
  } catch (error) {
    console.error(`Failed to load post file: ${jsonPath}`, error);
    return null;
  }
}

// 分割ブロックの型定義
type SplitBlock = Block & {
  source?: string;
};

// 分割された記事ファイルを読み込む
async function loadSplitPostFiles(slugPath: string): Promise<BlogPost | null> {
  try {
    const indexPath = path.join(slugPath, 'index.json');
    const indexContent = await fs.readFile(indexPath, 'utf-8');
    const indexPost = JSON.parse(indexContent) as { meta: BlogPost['meta'], blocks: SplitBlock[] };
    
    const updatedBlocks: Block[] = [];
    const blockLoadPromises = indexPost.blocks.map(async (block) => {
      if (block.type === 'blocks' && block.source) {
        const blockFilePath = path.join(slugPath, block.source);
        try {
          const blockContent = await fs.readFile(blockFilePath, 'utf-8');
          const { blocks } = JSON.parse(blockContent) as { blocks: Block[] };
          
          return blocks.map(b => ({
            ...b,
            id: generateBlockId(blockFilePath, b.id)
          }));
        } catch (error) {
          console.error(`Failed to load block file: ${blockFilePath}`, error);
          // ファイルの読み込みに失敗した場合は元のブロックを使用
          return [{
            ...block,
            id: generateBlockId(indexPath, block.id)
          }];
        }
      } else {
        // 'blocks'タイプでない場合は通常のブロックとして処理
        return [{
          ...block,
          id: generateBlockId(indexPath, block.id)
        }];
      }
    });

    const loadedBlockArrays = await Promise.all(blockLoadPromises);
    loadedBlockArrays.forEach(blocks => updatedBlocks.push(...blocks));

    return {
      meta: indexPost.meta,
      blocks: updatedBlocks
    };
  } catch (error) {
    console.error(`Failed to load split post files: ${slugPath}`, error);
    return null;
  }
}

// キャッシュの更新
async function updateCache(): Promise<void> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');
    const entries = await fs.readdir(postsDirectory, { withFileTypes: true });

    // 全記事の読み込み
    const loadedPosts = await Promise.all(
      entries.map(async (entry) => {
        const slug = entry.name.replace(/\.json$/, '');
        const fullPath = path.join(postsDirectory, entry.name);

        let post: BlogPost | null = null;

        if (entry.isDirectory()) {
          post = await loadSplitPostFiles(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          post = await loadSinglePostFile(fullPath);
        }

        if (!post) return null;

        // キャッシュを更新
        cache.posts.set(slug, post);
        return { ...post, slug } as PostWithSlug;
      })
    );

    // 有効な記事のみをフィルタリングして日付でソート
    const validPosts = loadedPosts
      .filter((post): post is PostWithSlug => post !== null && !post.meta.isDraft)
      .sort((a, b) => {
        const dateA = new Date(a.meta.publishedAt);
        const dateB = new Date(b.meta.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });

    // タグの収集
    const tags = new Set<string>();
    const taggedPosts = new Map<string, PostWithSlug[]>();

    validPosts.forEach(post => {
      post.meta.tags.forEach(tag => {
        const formattedTag = formatTagForUrl(tag);
        tags.add(tag);
        
        const postsWithTag = taggedPosts.get(formattedTag) || [];
        postsWithTag.push(post);
        taggedPosts.set(formattedTag, postsWithTag);
      });
    });

    // キャッシュの更新
    cache.allPosts = validPosts;
    cache.tags = tags;
    cache.taggedPosts = taggedPosts;
    cache.lastUpdated = Date.now();
  } catch (error) {
    console.error('Failed to update cache:', error);
    throw error;
  }
}

// 単一記事の取得
export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    // キャッシュが無効な場合は更新
    if (!isCacheValid()) {
      await updateCache();
    }

    // キャッシュから記事を取得
    const cachedPost = cache.posts.get(slug);
    if (cachedPost) {
      return cachedPost;
    }

    // キャッシュにない場合は個別に読み込み
    const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');
    const fullPath = path.join(postsDirectory, slug);
    
    let post: BlogPost | null = null;
    
    if (await isDirectory(fullPath)) {
      post = await loadSplitPostFiles(fullPath);
    } else {
      post = await loadSinglePostFile(`${fullPath}.json`);
    }

    if (post) {
      cache.posts.set(slug, post);
    }

    return post;
  } catch (error) {
    console.error(`Failed to get post: ${slug}`, error);
    return null;
  }
}

// 全記事の取得
export async function getAllPosts(): Promise<PostWithSlug[]> {
  try {
    // キャッシュが無効な場合は更新
    if (!isCacheValid()) {
      await updateCache();
    }

    return cache.allPosts || [];
  } catch (error) {
    console.error('Failed to get all posts:', error);
    return [];
  }
}

// 全タグの取得
export async function getAllTags(): Promise<string[]> {
  try {
    // キャッシュが無効な場合は更新
    if (!isCacheValid()) {
      await updateCache();
    }

    return cache.tags ? Array.from(cache.tags).sort() : [];
  } catch (error) {
    console.error('Failed to get all tags:', error);
    return [];
  }
}

// タグで記事を取得
export async function getPostsByTag(tag: string): Promise<PostWithSlug[]> {
  try {
    // キャッシュが無効な場合は更新
    if (!isCacheValid()) {
      await updateCache();
    }

    const formattedTag = formatTagForUrl(tag);
    return cache.taggedPosts.get(formattedTag) || [];
  } catch (error) {
    console.error(`Failed to get posts by tag: ${tag}`, error);
    return [];
  }
}