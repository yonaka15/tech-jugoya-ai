# ADR 001: Next.js App Routerでの静的サイト生成

## ステータス

完了 - 2025-01-01

## コンテキスト

記事ページ（`/blog/[slug]`）において、以下の課題がありました：

1. **パフォーマンス**
   - JSONブロックごとの個別読み込みによる遅延
   - 実行時のファイルI/Oによるオーバーヘッド
   - TTFBの悪化

2. **SEO**
   - 記事内容の初期表示遅延
   - メタデータ生成時の遅延

## 決定事項

記事ページに対してNext.js 15のStatic Site Generation（SSG）を導入し、ビルド時に静的生成を行うことを決定しました。

### 1. 基本方針

- 記事ページ（`/blog/[slug]`）をビルド時に静的生成
- `dynamicParams = false`による未定義パスへのアクセス制御
- `generateStaticParams`による記事パスの生成

### 2. 実装戦略

```typescript
// app/blog/[slug]/page.tsx

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
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: 'article'
    }
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

## 実装結果

### 1. パフォーマンス改善

実測値（サンプル記事：`/blog/downloading-videos-with-ffmpeg-m3u8`）：

導入前：
- TTFB: 1,819ms
- Loading time: 1,823ms
- Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
- OpenGraph: 未対応

導入後：
- TTFB: 174ms（90.4%改善）
- Loading time: 175ms（90.4%改善）
- Cache-Control: public, max-age=0, must-revalidate
- OpenGraph: 完全対応

### 2. 最適化の詳細

1. **コンテンツ配信**
   - Brotli圧縮の維持（効率的な圧縮を継続）
   - コンテンツサイズの安定性（18.7KB → 19.2KB）
   - プリレンダリングによる完全な静的HTML生成

2. **キャッシュ戦略**
   - CDN対応の public キャッシュ設定
   - コンテンツの鮮度を保つ must-revalidate の維持
   - 効率的なキャッシュ制御ヘッダーの実装

3. **メタデータ最適化**
   - OpenGraphタグの完全実装
   - Twitter Card対応の追加
   - 構造化されたメタデータ生成

## メリット

1. **パフォーマンス向上**
   - TTFBの大幅な改善（90.4%削減を達成）
   - CDNキャッシュの効率的な活用
   - サーバー負荷の軽減

2. **SEOの改善**
   - 完全な静的HTMLの提供
   - メタデータの即時利用可能性
   - SNS共有のための最適化

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

## モニタリング指標

1. **パフォーマンス**
   - TTFB: 目標200ms以下を維持
   - コンテンツ圧縮率の監視
   - キャッシュヒット率の測定

2. **品質管理**
   - ビルド成功率: 99.9%以上を維持
   - メタデータの整合性チェック

## 今後のモニタリング計画

1. **継続的な監視項目**
   - TTFBの安定性
   - キャッシュ効率の推移
   - コンテンツ配信の最適性

2. **最適化の検討事項**
   - ビルドキャッシュの活用
   - 差分ビルドの導入
   - CDN設定の微調整

## 学んだ教訓

1. **効果的だった施策**
   - ビルド時の完全な静的生成
   - `dynamicParams = false`の採用
   - メタデータの事前生成
   - public キャッシュ戦略の採用

2. **改善の余地**
   - ビルドプロセスの最適化
   - キャッシュ戦略の詳細な調整
   - 監視体制の強化

## 結論

Next.js 15のStatic Site Generationの導入は、以下の点で顕著な成果を上げました：

1. パフォーマンス
   - TTFBの90.4%改善（1,819ms → 174ms）
   - 読み込み時間の90.4%改善（1,823ms → 175ms）
   - CDNキャッシュの効果的な活用

2. コンテンツ配信
   - 効率的な圧縮の維持
   - 最適化されたキャッシュ制御
   - 完全な静的HTML生成

3. 将来性
   - スケーラブルな基盤の確立
   - SEO/SNS対応の強化
   - 継続的な最適化の余地を確保

この実装により、分割されたJSONによる効率的な記事データ管理と、高いパフォーマンスの両立を実現しました。特に、JSONブロックの柔軟な管理構造を維持したまま、静的生成による高速なコンテンツ配信を実現できたことは、当初の想定を超える成果です。この基盤は、今後のコンテンツ拡充とシステム進化の両面で、持続可能な発展を可能にします。