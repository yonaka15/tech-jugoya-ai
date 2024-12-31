import { type BlogPost, Block } from '@/types/blog';
import fs from 'fs/promises';
import path from 'path';

export type PostWithSlug = BlogPost & { slug: string };

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

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');
    const slugPath = path.join(postsDirectory, slug);
    const isDir = await isDirectory(slugPath);

    if (isDir) {
      // ディレクトリ構造の場合
      const indexPath = path.join(slugPath, 'index.json');
      const indexContent = await fs.readFile(indexPath, 'utf-8');
      const indexPost = JSON.parse(indexContent) as BlogPost;
      
      const updatedBlocks: Block[] = [];
      
      for (const block of indexPost.blocks) {
        const { type } = block;
        const blockFilePath = path.join(slugPath, `${type}.json`);
        
        try {
          const blockContent = await fs.readFile(blockFilePath, 'utf-8');
          const { blocks } = JSON.parse(blockContent) as { blocks: Block[] };
          
          // 各ブロックのIDを解決
          const resolvedBlocks = blocks.map(b => ({
            ...b,
            id: generateBlockId(blockFilePath, b.id)
          }));
          
          updatedBlocks.push(...resolvedBlocks);
        } catch (error) {
          console.error(`Failed to load block file: ${blockFilePath}`, error);
          updatedBlocks.push(block);
        }
      }

      return {
        meta: indexPost.meta,
        blocks: updatedBlocks
      };
    } else {
      // 単一ファイルの場合
      const filePath = path.join(postsDirectory, `${slug}.json`);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const post = JSON.parse(fileContent) as BlogPost;
      
      // 単一ファイルの場合もブロックIDを解決
      const resolvedBlocks = post.blocks.map(block => ({
        ...block,
        id: generateBlockId(filePath, block.id)
      }));

      return {
        ...post,
        blocks: resolvedBlocks
      };
    }
  } catch (error) {
    console.error(`Failed to load post: ${slug}`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<PostWithSlug[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');
    const entries = await fs.readdir(postsDirectory, { withFileTypes: true });
    
    const posts = await Promise.all(
      entries.map(async (entry) => {
        const slug = entry.name.replace(/\.json$/, '');
        
        if (entry.isDirectory()) {
          // ディレクトリの場合はディレクトリ名をスラッグとして使用
          const post = await getPost(slug);
          if (!post) return null;
          return { ...post, slug };
        }
        
        if (entry.isFile() && entry.name.endsWith('.json')) {
          // 単一ファイルの場合は拡張子を除いた名前をスラッグとして使用
          const post = await getPost(slug);
          if (!post) return null;
          return { ...post, slug };
        }

        return null;
      })
    );

    return posts
      .filter((post): post is PostWithSlug => post !== null)
      .sort((a, b) => {
        const dateA = new Date(a.meta.publishedAt);
        const dateB = new Date(b.meta.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });
  } catch (error) {
    console.error('Failed to get all posts:', error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  
  posts.forEach(post => {
    post.meta.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export async function getPostsByTag(tag: string): Promise<PostWithSlug[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.meta.tags.includes(tag));
}