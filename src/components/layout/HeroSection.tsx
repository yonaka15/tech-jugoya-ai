import React from 'react';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950 overflow-hidden">
      {/* 幾何学的な背景パターン */}
      <div className="absolute inset-0">
        {/* 左上のグラデーション */}
        <div className="absolute -left-24 -top-24 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl" />
        {/* 右下のグラデーション */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl" />
        {/* 中央のアクセント */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
      </div>

      {/* メインコンテンツ */}
      <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          {/* サイトタイトル */}
          <h1 className="mb-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            tech.jugoya.ai
          </h1>
          
          {/* サブタイトル */}
          <p className="text-3xl font-medium text-blue-300 mb-8 sm:mb-12">
            技術的な発見と学びを共有する
          </p>

          <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-200">
            Next.js、TypeScript、AI、アーキテクチャ設計など、
            <br className="hidden sm:block" />
            モダンな技術スタックとベストプラクティスについて発信
          </p>

          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              記事を読む
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-100 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 shadow-lg shadow-slate-800/20 border border-slate-700"
            >
              このサイトについて
            </Link>
          </div>
        </div>

        {/* デコレーション要素 */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500/10 via-white/20 to-purple-500/10" />
      </div>
    </div>
  );
};