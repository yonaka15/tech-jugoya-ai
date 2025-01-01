# tech.jugoya.ai

[![Apache License 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1-black)](https://nextjs.org/)

[tech.jugoya.ai](https://tech.jugoya.ai) のソースコードです。
Next.js App Router と TypeScript で実装された、ブロックベースのブログシステムです。

## 開発メモ

### Next.js 15 の主な変更点

- **params の非同期化**: Next.js 15 以降、ページコンポーネントの`params`プロパティが非同期（Promise）になりました。

  ```typescript
  // Before (Next.js 14以前)
  type Props = {
    params: { tag: string };
  };

  // After (Next.js 15以降)
  type Props = {
    params: Promise<{ tag: string }>;
  };

  // 使用例
  export default async function Page({ params }: Props) {
    const { tag } = await params;
    // ...
  }
  ```

## 開発状況

- ✅ プロジェクトの基本設定
- ✅ [型定義の実装](src/types/README.md)（型安全なブロックシステムの基盤）
- ✅ ブロックシステムの基本実装
  - ✅ HeadingBlock（見出しブロック）
  - ✅ TextBlock（Markdown 記法対応）
  - ✅ ImageBlock
  - ✅ CodeBlock（シンタックスハイライト＆コピー機能対応）
  - ✅ QuoteBlock
  - ✅ CalloutBlock
  - ✅ TableBlock
  - ✅ MermaidBlock（図表・ダイアグラム対応）
- ✅ サイトレイアウト
  - ✅ ヘッダー
  - ✅ フッター（著作権表示）
  - ✅ アクセス解析（Ahrefs Analytics）
- ✅ トップページ
  - ✅ 最新記事の表示
  - ✅ 人気タグクラウド
- ✅ ブログ一覧ページ
- ✅ 記事詳細ページ
- ✅ タグによるフィルタリング
- ✅ About ページ
- 🚧 記事の検索機能
- 🚧 ページネーション
- 🚧 プレビュー機能
- 🚧 OGP 画像の自動生成
- 🚧 記事読み込みの最適化（[ADR-001](docs/adr/001-blog-content-loading-optimization.md)）

## 🌟 特徴

- **型安全なブロックシステム**: TypeScript とジェネリクスを活用した堅牢な記事管理
- **モジュラー設計**: 新しいブロックタイプを簡単に追加可能
- **SEO フレンドリー**: App Router による最適化とメタデータ管理
- **高いパフォーマンス**: 最新の Next.js 機能を活用した効率的なレンダリング
- **レスポンシブデザイン**: モバイルフレンドリーなレイアウトと UI
- **リッチなコンテンツ表現**: Mermaid.js を活用した図表やダイアグラムのサポート

## 📜 アーキテクチャの決定記録（ADR）

プロジェクトの重要な技術的決定は、Architecture Decision Records（ADR）として文書化しています。

現在の ADR:

- [ADR-001: ブログ記事読み込みの最適化方針](docs/adr/001-blog-content-loading-optimization.md) - 2025-01-01

## 📂 プロジェクト構造

```
src/
├── app/                   # Next.js App Router
│   ├── blog/             # ブログページ
│   │   ├── [slug]/      # 記事ページ
│   │   └── page.tsx     # ブログ一覧
│   └── ...
├── components/           # Reactコンポーネント
│   ├── blog/
│   │   └── blocks/      # ブロックコンポーネント ([詳細](src/components/blog/blocks/README.md))
│   └── ...
├── content/             # コンテンツ ([詳細](src/content/README.md))
│   └── posts/          # 記事JSON
│       ├── single-post.json            # 単一ファイル記事 (非推奨)
│       └── multi-part-post/            # 分割された記事
│           ├── index.json              # メタ情報とブロックの順序
│           ├── content/               # 記事内容のJSON
│           │   ├── introduction.json  # 導入部のブロック
│           │   └── conclusion.json    # 結論部のブロック
├── types/              # 型定義 ([詳細](src/types/README.md))
└── lib/               # ユーティリティ ([詳細](src/lib/README.md))
```

## 📝 記事の作成

tech.jugoya.ai の記事は、単一の JSON ファイルとして作成するのは非推奨です。複数のファイルに分割して管理できます。

記事の作成方法や規則について、詳しくは[コンテンツ管理のドキュメント](src/content/README.md)を参照してください。

各ブロックタイプの使用方法については、[ブロックシステムのドキュメント](src/components/blog/blocks/README.md)を参照してください。

## 🧩 カスタマイズ

### 新しいブロックタイプの追加

新しいブロックタイプの追加方法については、[ブロックシステムのドキュメント](src/components/blog/blocks/README.md#新しいブロックタイプの追加方法)を参照してください。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📜 ライセンス

このプロジェクトはデュアルライセンスで提供されています：

### ソースコード

ソースコード（src/content ディレクトリを除く）は [Apache License 2.0](LICENSE) の下で提供されています。

- ✅ 商用利用可能
- ✅ 変更可能
- ✅ 配布可能
- ℹ️ 変更時の明示が必要
- ℹ️ 著作権表示の維持が必要

### コンテンツ

src/content ディレクトリ内のすべてのコンテンツ（記事、画像など）は [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) の下で提供されています。

コンテンツのライセンスについての詳細は[コンテンツ管理のドキュメント](src/content/README.md#ライセンス)を参照してください。

## ✨ 謝辞

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- その他の素晴らしい OSS プロジェクト

---

🌐 [tech.jugoya.ai](https://tech.jugoya.ai) | 📧 [Issues](https://github.com/yonaka15/tech-jugoya-ai/issues)

