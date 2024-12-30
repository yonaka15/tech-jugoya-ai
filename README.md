# tech.jugoya.ai

[![Apache License 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)

[tech.jugoya.ai](https://tech.jugoya.ai) のソースコードです。
Next.js App RouterとTypeScriptで実装された、ブロックベースのブログシステムです。

## 開発状況

- ✅ プロジェクトの基本設定
- ✅ 型定義の実装
- ✅ ブロックシステムの基本実装
  - ✅ HeadingBlock（見出しブロック）
  - ✅ TextBlock（改行対応）
  - ✅ ImageBlock
  - ✅ CodeBlock（シンタックスハイライト＆コピー機能対応）
  - ✅ QuoteBlock
  - ✅ CalloutBlock
  - ✅ TableBlock
- ✅ サイトレイアウト＆ヘッダー
- ✅ トップページ
  - ✅ 最新記事の表示
  - ✅ 人気タグクラウド
- ✅ ブログ一覧ページ
- ✅ 記事詳細ページ
- 🚧 タグによるフィルタリング
- 🚧 記事の検索機能
- 🚧 ページネーション
- 🚧 プレビュー機能
- 🚧 OGP画像の自動生成

## 🌟 特徴

- **型安全なブロックシステム**: TypeScriptとジェネリクスを活用した堅牢な記事管理
- **モジュラー設計**: 新しいブロックタイプを簡単に追加可能
- **SEOフレンドリー**: App Routerによる最適化とメタデータ管理
- **高いパフォーマンス**: 最新のNext.js機能を活用した効率的なレンダリング
- **レスポンシブデザイン**: モバイルフレンドリーなレイアウトとUI

## 🔧 技術スタック

- [Next.js](https://nextjs.org/) 14 (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## 🚀 開始方法

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/tech-jugoya-ai.git
cd tech-jugoya-ai

# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## 📝 ブロックシステム

記事は複数の型付きブロックで構成されます：

```typescript
type BaseBlock<T extends string, P = unknown> = {
  id: string;
  type: T;
  props: P;
};
```

### 利用可能なブロック

- **HeadingBlock**: 見出しブロック（レベル1-6、配置調整可能）
- **TextBlock**: テキストブロック（配置調整可能）
- **ImageBlock**: 画像ブロック（キャプション対応）
- **CodeBlock**: コードブロック（シンタックスハイライト＆コピー機能対応）
- **QuoteBlock**: 引用ブロック
- **CalloutBlock**: 注意書きブロック
- **TableBlock**: テーブルブロック

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
│   │   └── blocks/      # ブロックコンポーネント
│   └── ...
├── content/             # コンテンツ
│   └── posts/          # 記事JSON
├── types/              # 型定義
└── lib/               # ユーティリティ
```

## 📝 記事の作成

1. `src/content/posts` に新しいJSONファイルを作成:

```json
{
  "meta": {
    "title": "記事タイトル",
    "description": "記事の説明",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "tags": ["Next.js", "TypeScript"]
  },
  "blocks": [
    {
      "id": "intro",
      "type": "text",
      "props": {
        "content": "本文...",
        "align": "left"
      }
    }
  ]
}
```

## 🧩 カスタマイズ

### 新しいブロックタイプの追加

1. `types/blog.ts` に型を追加:

```typescript
export type NewBlockProps = {
  // プロパティを定義
};

export type NewBlock = BaseBlock<'new-block', NewBlockProps>;
```

2. コンポーネントを作成:

```typescript
const NewBlock: FC<NewBlockProps> = (props) => {
  // コンポーネントの実装
};
```

3. `BlockRenderer` に追加

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

- ✅ 記事の閲覧・共有可能
- ✅ 非商用目的での使用可能
- ❌ 商用利用禁止
- ❌ 改変禁止
- ℹ️ 著作権表示が必要

## ✨ 謝辞

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- その他の素晴らしいOSSプロジェクト

---

🌐 [tech.jugoya.ai](https://tech.jugoya.ai) | 📧 [Issues](https://github.com/yourusername/tech-jugoya-ai/issues)