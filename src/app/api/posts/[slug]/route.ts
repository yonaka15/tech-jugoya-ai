import { getPost } from "@/lib/blog";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export const runtime = 'nodejs';

type Context = {
  params: {
    slug: string;
  };
};

export async function GET(
  request: NextRequest,
  context: Context
) {
  const post = await getPost(context.params.slug);
  
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