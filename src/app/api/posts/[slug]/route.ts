import { getPost } from "@/lib/blog";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  
  if (!post) {
    return new NextResponse("Not found", { status: 404 });
  }

  // キャッシュヘッダーの設定
  const headersList = await headers();
  const referer = headersList.get("referer");
  
  // OG画像生成からのリクエストの場合はキャッシュを無効化
  const cacheControl = referer?.includes("/opengraph-image") 
    ? "no-store"
    : "public, max-age=31536000"; // 1年間のキャッシュ

  return NextResponse.json(post, {
    headers: {
      "Cache-Control": cacheControl,
    },
  });
}