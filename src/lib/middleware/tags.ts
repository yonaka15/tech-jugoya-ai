// src/lib/middleware/tags.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { formatTagForUrl } from '../tags'

/**
 * タグページのURLを正規化する
 * - /tags/{tag} 形式のパスを処理
 * - 大文字や空白を含むタグを正規化
 * - URL規格に沿った形式に変換
 * 
 * @example
 * - /tags/Streaming -> /tags/streaming
 * - /tags/Web%20Development -> /tags/web-development
 */
export function normalizeTagUrl(request: NextRequest): NextResponse | null {
  if (!request.nextUrl.pathname.startsWith('/tags/')) {
    return null
  }

  const parts = request.nextUrl.pathname.split('/')
  if (parts.length !== 3 || !parts[2]) {
    return null
  }

  // URLエンコードされた状態を元に戻してから処理
  const tag = decodeURIComponent(parts[2])
  const normalizedTag = formatTagForUrl(tag)
  
  if (normalizedTag === parts[2]) {
    return null
  }

  const newUrl = new URL(request.url)
  newUrl.pathname = `/tags/${normalizedTag}`
  return NextResponse.redirect(newUrl, 308) // 308 Permanent Redirect
}