# ADR-004: Canonical URL実装の修正

## ステータス
- 提案: 2025-01-02
- 承認: 2025-01-02
- 実装: ⏳進行中

## 文脈

`/about`と`/blog`ページにおいて、以下の問題が確認されました：

1. **Canonical URLの不整合**
   - sitemapに含まれるURLとcanonical要素の不一致
   - 両ページが同一のcanonical URL（ホームページ）を指している
   - 各ページは41件の内部リンクを持つ

2. **既存の実装状況**
   - Next.js Metadata APIを使用済み
   - `defaultMetadata`の設定あり
   - sitemap.tsで両ページは適切に登録済み
   - 各ページは独自のコンテンツを持つ

## 決定

以下の方針で実装を行う：

1. **独立したページとしての設定維持**
   - `/about`と`/blog`は独自のコンテンツと目的を持つため、独立したページとして扱う
   - それぞれ適切なcanonical URLを設定

2. **既存のMetadata API実装の拡張**

```typescript
// src/app/blog/page.tsx
export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Blog Posts | tech.jugoya.ai',
  description: 'tech.jugoya.aiの技術記事一覧です。',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Blog Posts | tech.jugoya.ai',
    description: 'tech.jugoya.aiの技術記事一覧です。',
    url: `${siteConfig.url}/blog`,
  },
};

// src/app/about/page.tsx
export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'About | tech.jugoya.ai',
  description: 'tech.jugoya.aiについて',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'About | tech.jugoya.ai',
    description: 'tech.jugoya.aiについて',
    url: `${siteConfig.url}/about`,
  },
};
```

3. **sitemap.tsの維持**
   - 現在の実装を維持（変更不要）
   - 両ページは既に適切な優先度とchange frequencyで登録済み

## 技術的影響

1. **変更箇所**
   - `src/app/about/page.tsx`
   - `src/app/blog/page.tsx`

2. **不変箇所**
   - `src/app/sitemap.ts`
   - URL構造
   - 内部リンク（41件）

3. **SEOへの影響**
   - canonical URL修正による一時的なインデックス再評価
   - 明確なURL構造の確立
   - クローラーへの適切な指示

## 実装計画

1. **変更実装**（Day 1）
   - ✅ 現状分析と方針決定
   - ✅ 既存コードの確認
   - ⏳ Metadata APIを使用したcanonical URL実装
   - ⏳ OGPのURL設定更新

2. **検証**（Day 1-2）
   - ⏳ canonical URLの出力確認
   - ⏳ OGPメタデータの検証
   - ⏳ HTML検証
   - ⏳ リグレッションテスト

## 代替案

1. **ホームページへのマージ**
   - メリット: URL構造の単純化
   - デメリット: コンテンツの独自性が失われる
   - 却下理由: 両ページは独自の価値を持つ

2. **sitemapからの除外**
   - メリット: 実装の簡略化
   - デメリット: ページの発見可能性の低下
   - 却下理由: 重要なナビゲーションページとして必要

## モニタリング

1. **実装直後**
   - canonical URLの出力確認
   - OGPタグの検証
   - HTML構造の確認

2. **継続的監視**
   - Search Console での認識状況
   - インデックス状態
   - クロール状況

## 結論

この実装により：

1. **SEOの改善**
   - 明確なURL階層の確立
   - クローラーへの適切な指示
   - インデックスの最適化

2. **保守性の向上**
   - Metadata APIの一貫した使用
   - 型安全な実装
   - 明確なページ構造

3. **ユーザビリティ**
   - 明確なナビゲーション構造の維持
   - 適切なページ分割の継続
   - コンテンツの独立性確保