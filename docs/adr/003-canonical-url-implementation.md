# ADR-003: Canonical URL実装とSEO最適化

## ステータス

- 提案: 2025-01-02
- 承認: 2025-01-02
- 実装: 2025-01-02
- 更新: 2025-01-02

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
        source: '/tags/:tag/',
        destination: '/tags/:tag',
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
   - 各タグページが独自の適切なcanonical URLを持つように
   - sitemapとcanonical要素の整合性確保
   - 検索エンジンへの明確な指示

2. **URL正規化の成果**
   - 一貫性のあるURL形式の実現
   - リダイレクトによる自動修正
   - クリーンなURL構造の維持

3. **メタデータの充実**
   - 完全なOGP実装
   - Twitter Card対応
   - 明示的なrobots設定

## 技術的影響

### ビルド・デプロイメント
1. **ビルド時の考慮事項**
   - メタデータの事前生成
   - リダイレクトルールの適用
   - sitemap生成の更新

2. **デプロイメント**
   - 段階的なロールアウト
   - キャッシュの考慮
   - 移行期間の設定

### 運用面の影響
1. **モニタリング**
   - Search Consoleでのインデックス状況確認
   - canonical URL認識の監視
   - クロール状況の追跡

2. **保守性**
   - URL構造の一貫性維持
   - メタデータの更新管理
   - リダイレクトルールのメンテナンス

## リスク

1. **一時的なSEOへの影響**
   - リスク: インデックス再構築期間中の順位変動
   - 対策: 段階的な移行と監視強化

2. **パフォーマンスへの影響**
   - リスク: リダイレクト処理による遅延
   - 対策: Edge Runtimeでの処理とキャッシュ活用

## モニタリング計画

1. **即時の監視項目**
   - canonical URLの認識状況
   - インデックス状態の変化
   - クロール頻度の変動

2. **長期的な監視**
   - SEOパフォーマンスの推移
   - ユーザー行動の変化
   - エラー発生状況

## 学んだ教訓

1. **効果的だった施策**
   - Next.js 15のMetadata APIの活用
   - 包括的なURL正規化
   - 充実したメタデータ実装

2. **改善の余地**
   - キャッシュ戦略の最適化
   - エラー処理の強化
   - モニタリングの自動化

## 代替案検討

### 採用した案
1. **Next.js 15 Metadata API方式**
   - メリット: 型安全性、統一的な管理
   - コスト: 実装の複雑さ

2. **URLリダイレクト方式**
   - メリット: 一貫性の確保
   - コスト: パフォーマンスへの影響

### 却下した案
1. **従来のhead.js方式**
   - メリット: 実装の単純さ
   - 却下理由: App Router非対応

2. **クエリパラメータの許容**
   - メリット: 実装の容易さ
   - 却下理由: URL構造の複雑化

## 結論

この実装により：

1. **SEOの改善**
   - 明確なURL構造の確立
   - 適切なメタデータの提供
   - 検索エンジンのクロール最適化

2. **保守性の向上**
   - 一貫性のあるURL管理
   - 明確なリダイレクト戦略
   - 体系的なメタデータ管理

3. **将来性**
   - Next.js 15の機能を最大限活用
   - モニタリング基盤の確立
   - 継続的な最適化の余地