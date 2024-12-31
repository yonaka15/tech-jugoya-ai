import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createAccessLog, logAccess } from './lib/middleware/logger'

export function middleware(request: NextRequest) {
  const log = createAccessLog(request)
  logAccess(log)

  return NextResponse.next()
}

/**
 * 除外すべきパスのパターン
 * - _next/static: Next.jsの静的ファイル
 * - _next/image: Next.jsの画像最適化
 * - _vercel: Vercelの内部エンドポイント
 * - favicon.ico: ファビコン
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_vercel|favicon.ico).*)',
  ]
}