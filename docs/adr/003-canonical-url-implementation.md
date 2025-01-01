# ADR-003: Canonical URL実装とSEO最適化

## ステータス

- 提案: 2025-01-02
- 承認: 2025-01-02
- 実装: 2025-01-02
- 更新: 2025-01-02
- 完了: 2025-01-02

## 文脈

タグページ（`/tags/[tag]`）において、以下のSEO関連の課題が確認されました：

1. **Canonical URLの不整合**
   - sitemapに含まれるURLとcanonical要素の不一致
   - すべてのタグページが同一のcanonical URL（ルートURL）を指定
   - 検索エンジンに混乱を与える可能性

2. **URL正規化の課題**
   - トレーリングスラッシュの非一貫性
   - 大文字小文字の揺れ
   - クエリパラメータの取り扱い

3. **メタデータの不足**
   - 基本的なtitleとdescriptionのみ
   - OpenGraphタグの欠如
   - Twitter Cardの未設定

## 決定

Next.js 15の新しいMetadata APIを活用し、以下の方針で実装を行う：

1. **metadataBaseの設定とCanonical URLの適切な実装**
```typescript
// src/types/metadata.ts
export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://tech.jugoya.ai'),
  title: {
    default: 'tech.jugoya.ai',
    template: '%s | tech.jugoya.ai'
  }
};

// src/app/tags/[tag]/page.tsx
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { tag } = await params;
  const originalCase = await getOriginalCaseTag(tag);
  const canonicalPath = `/tags/${formatTagForUrl(originalCase)}`;
  
  return {
    alternates: {
      canonical: canonicalPath,
    },
    // ... その他のメタデータ
  };
}
```

2. **URL正規化の実装**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // その他のリダイレクトルール
    ];
  },
};
```

3. **充実したメタデータの実装**
```typescript
return {
  title: `${originalCase}の記事一覧`,
  description: `tech.jugoya.aiの${originalCase}に関する記事一覧です。`,
  openGraph: {
    title: `${originalCase}の記事一覧 | tech.jugoya.ai`,
    description: `tech.jugoya.aiの${originalCase}に関する記事一覧です。`,
    url: canonicalPath,
    siteName: 'tech.jugoya.ai',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${originalCase}の記事一覧 | tech.jugoya.ai`,
    description: `tech.jugoya.aiの${originalCase}に関する記事一覧です。`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};
```

## 実装結果

1. **Canonical URL の改善**
   - すべてのタグページが独自の適切なcanonical URLを持つように設定
   - sitemapとcanonical要素の整合性を確保
   - Next.jsのMetadata APIを活用した型安全な実装

2. **URL正規化の成果**
   - トレーリングスラッシュの自動除去による一貫したURL構造の実現
   - 大文字小文字の自動変換による正規化
   - 不要なクエリパラメータの適切な処理

3. **メタデータの充実**
   - OpenGraphとTwitter Cardの完全な実装
   - 動的なタグ情報を含む詳細な説明文
   - Google Search Consoleに最適化されたrobots設定

## 技術的影響

### ビルド・デプロイメント
1. **ビルド時の考慮事項**
   - メタデータの事前生成と検証
   - リダイレクトルールのテスト
   - sitemapの自動更新確認

2. **デプロイメント**
   - Edge Runtimeでの処理による高速なレスポンス
   - キャッシュヘッダーの適切な設定
   - CloudFlare CDNとの統合確認

### 運用面の影響
1. **モニタリング体制**
   - Search Consoleとの連携強化
   - クロールレポートの定期確認
   - アクセスログの分析

2. **保守性**
   - URLパターンの一元管理
   - メタデータ生成ロジックの集中管理
   - リダイレクトルールの定期見直し

## リスク対策

1. **SEOへの一時的影響への対応**
   - Search Consoleでのクロール状況の監視強化
   - サイトマップの即時更新設定
   - インデックス再構築の進捗確認

2. **パフォーマンスの最適化**
   - Edge Runtimeの活用による高速化
   - キャッシュ戦略の最適化
   - リダイレクト処理の効率化

## モニタリング実装

1. **自動モニタリング**
   - Search Console APIを活用した自動レポート生成
   - CloudFlareアナリティクスとの連携
   - エラーログの集中管理

2. **定期チェック項目**
   - インデックス状況の週次確認
   - パフォーマンスメトリクスの月次レビュー
   - 検索順位の変動トラッキング

## 今後の展開

1. **最適化の継続**
   - パフォーマンスデータに基づくチューニング
   - メタデータ生成の自動化強化
   - モニタリングツールの拡充

2. **機能拡張の検討**
   - 構造化データの追加
   - AMP対応の検討
   - 国際化対応の準備

## まとめ

この実装により：

1. **SEOの基盤強化**
   - 明確なURL戦略の確立
   - 充実したメタデータ提供
   - 効率的なクロール制御

2. **運用効率の向上**
   - 自動化されたURL管理
   - 統合的なメタデータ制御
   - 効果的なモニタリング体制

3. **将来への準備**
   - スケーラブルな実装
   - 拡張性の確保
   - 継続的な改善基盤の確立