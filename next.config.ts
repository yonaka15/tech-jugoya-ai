import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像最適化の設定
  images: {
    domains: ['github.com'],
  },
  
  // URL正規化のためのリダイレクトルール
  async redirects() {
    return [
      // トレーリングスラッシュの正規化
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // 大文字小文字の正規化
      {
        source: '/BLOG',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ABOUT',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/TAGS',
        destination: '/tags',
        permanent: true,
      },
      // クエリパラメータの正規化
      {
        source: '/blog/:slug/amp',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/blog/:slug/print',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;