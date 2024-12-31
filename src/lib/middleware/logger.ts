// src/lib/middleware/logger.ts
import type { NextRequest } from 'next/server'

export interface AccessLog {
  timestamp: string
  url: string
  method: string
  pathname: string
  search: string
  headers: {
    userAgent: string | null
    referer: string | null
    accept: string | null
    acceptEncoding: string | null
    acceptLanguage: string | null
    host: string | null
  }
}

export function createAccessLog(request: NextRequest): AccessLog {
  return {
    timestamp: new Date().toISOString(),
    url: request.url,
    method: request.method,
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
    headers: {
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
      accept: request.headers.get('accept'),
      acceptEncoding: request.headers.get('accept-encoding'),
      acceptLanguage: request.headers.get('accept-language'),
      host: request.headers.get('host'),
    },
  }
}

export function logAccess(log: AccessLog): void {
  console.log('Access Log:', JSON.stringify(log, null, 2))
}