# ADR 001: Next.js App Routerでの静的サイト生成

## ステータス

承認 - 2025-01-01

## コンテキスト

記事ページ（`/blog/[slug]`）において、以下の課題があります：

1. **パフォーマンス**
   - JSONブロックごとの個別読み込みによる遅延
   - 実行時のファイルI/Oによるオーバーヘッド
   - TTFBの悪化

2. **SEO**
   - 記事内容の初期表示遅延
   - メタデータ生成時の遅延

## 決定事項

記事ページに対してNext.js 15のStatic Site Generation（SSG）を導入し、ビルド時に静的生成を行います。

### 1. 基本方針

- 記事ページ（`/blog/[slug]`）をビルド時に静的生成
- `dynamicParams = false`による未定義パスへのアクセス制御
- `generateStaticParams`による記事パスの生成

### 2. 実装戦略

```typescript
// pages/[slug]/page.tsx

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  return {
    title: post.meta.title,
    description: post.meta.description
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  return <PostContent post={post} />;
}
```

### 3. 対象範囲

- `/blog/[slug]`（個別記事ページ）

その他のページは現状の実装を維持します：
- `/blog`（記事一覧）
- `/blog/tags`（タグ一覧）
- `/blog/tags/[tag]`（タグ別記事一覧）
- `/`（トップページ）
- `/about`（アバウトページ）

## メリット

1. **パフォーマンス向上**
   - TTFBの大幅な改善
   - CDNキャッシュの効率的な活用
   - サーバー負荷の軽減

2. **SEOの改善**
   - 完全な静的HTMLの提供
   - メタデータの即時利用可能性
   - クローラビリティの向上

3. **運用の簡素化**
   - デプロイの単純化
   - エラー処理の削減
   - インフラ管理の簡素化

## リスク

1. **ビルド時間**
   - リスク: 記事数の増加に伴うビルド時間の増加
   - 対策: 必要に応じてビルドのチャンク分割を検討

2. **緊急更新**
   - リスク: コンテンツの即時反映が必要な場合の遅延
   - 対策: Vercelの自動デプロイ機能を活用

## 実装計画

1. **フェーズ1: 静的生成の実装（2日）**
   - `/blog/[slug]`の`generateStaticParams`実装
   - `dynamicParams = false`の設定
   - メタデータの静的生成対応

2. **フェーズ2: 検証（1日）**
   - ビルド時のパフォーマンス計測
   - ページ表示速度の計測
   - 既存機能への影響確認

## モニタリング指標

1. **パフォーマンス**
   - TTFB: CDNレイテンシのみ（〜50ms）
   - Largest Contentful Paint: 1.5秒以下

2. **ビルド**
   - ビルド時間: 5分以内
   - ビルド成功率: 99.9%以上

## 結論

記事ページに対してNext.js 15のStatic Site Generationを導入することで、以下を実現します：

1. パフォーマンス
   - ブロック読み込みの最適化
   - TTFBの改善
   - CDNキャッシュの活用

2. SEO
   - 完全な静的HTMLの提供
   - メタデータの即時利用

3. 運用
   - Vercelの自動デプロイによる安定した更新
   - エラー処理の簡素化

影響範囲を記事ページに限定することで、リスクを最小限に抑えつつ、最大の効果を得ることができます。