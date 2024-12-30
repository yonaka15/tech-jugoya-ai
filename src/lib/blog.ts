import { type BlogPost } from '@/types/blog';

export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await import(`@/content/posts/${slug}.json`);
    return post.default as BlogPost;
  } catch (error) {
    console.error(`Failed to load post: ${slug}`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // TODO: Implement getting all posts
  return [];
}
