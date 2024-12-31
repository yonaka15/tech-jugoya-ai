import { type BlogPost } from '@/types/blog';
import fs from 'fs/promises';
import path from 'path';

export type PostWithSlug = BlogPost & { slug: string };

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as BlogPost;
  } catch (error) {
    console.error(`Failed to load post: ${slug}`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<PostWithSlug[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');
    const files = await fs.readdir(postsDirectory);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const posts = await Promise.all(
      jsonFiles.map(async (file) => {
        const slug = file.replace(/\.json$/, '');
        const post = await getPost(slug);
        if (!post) return null;
        return { ...post, slug };
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