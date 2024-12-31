# ブロックシステム

このディレクトリには、tech.jugoya.aiで使用される各種ブロックコンポーネントが含まれています。ブロックベースのコンテンツ管理システムを実現するための主要なコンポーネントを提供します。

## 概要

ブロックシステムは、以下のコンポーネントで構成されています：

- `BlockRenderer.tsx`: すべてのブロックタイプのレンダリングを管理
- `HeadingBlock.tsx`: 見出しブロック（h1-h6）
- `TextBlock.tsx`: Markdown対応テキストブロック
- `ImageBlock.tsx`: 画像ブロック
- `CodeBlock.tsx`: シンタックスハイライト付きコードブロック
- `QuoteBlock.tsx`: 引用ブロック
- `CalloutBlock.tsx`: 注意書きブロック
- `TableBlock.tsx`: テーブルブロック

## 基本構造

すべてのブロックは共通の型定義に基づいて実装されています：

```typescript
type BaseBlock<T extends string, P = unknown> = {
  id: string;    // ブロックの一意識別子
  type: T;       // ブロックタイプ
  props: P;      // ブロック固有のプロパティ
};
```

## BlockRenderer

`BlockRenderer`は、ブロックタイプに応じて適切なコンポーネントを選択してレンダリングする役割を担います：

```typescript
interface BlockRendererProps {
  block: Block;  // Union型で定義された任意のブロック
}

// 使用例
const MyComponent: FC<{ blocks: Block[] }> = ({ blocks }) => {
  return (
    <div>
      {blocks.map(block => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};
```

## 各ブロックタイプの詳細

### HeadingBlock

見出しブロックは、h1からh6までの見出しレベルと配置をサポートします。

```typescript
type HeadingBlockProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;  // 見出しレベル
  content: string;               // 見出しテキスト
  align?: 'left' | 'center' | 'right';  // テキストの配置
};

// 使用例
const heading: Block = {
  id: 'intro-heading',
  type: 'heading',
  props: {
    level: 2,
    content: 'はじめに',
    align: 'left'
  }
};
```

### TextBlock

Markdownをサポートしたテキストブロックです。react-markdownを使用して実装されています。

```typescript
type TextBlockProps = {
  content: string;  // Markdown形式のテキスト
  align?: 'left' | 'center' | 'right';  // テキストの配置
};

// 使用例
const text: Block = {
  id: 'intro-text',
  type: 'text',
  props: {
    content: '**Markdown** をサポートした段落です。\n\n- リスト項目1\n- リスト項目2',
    align: 'left'
  }
};
```

### CodeBlock

シンタックスハイライトとコピー機能を備えたコードブロックです。

```typescript
type CodeBlockProps = {
  content: string;        // コードの内容
  language?: string;      // プログラミング言語
  fileName?: string;      // 表示するファイル名（オプション）
  showLineNumbers?: boolean;  // 行番号の表示
};

// 使用例
const code: Block = {
  id: 'example-code',
  type: 'code',
  props: {
    content: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    language: 'typescript',
    fileName: 'example.ts',
    showLineNumbers: true
  }
};
```

### ImageBlock

画像とキャプションを表示するブロックです。

```typescript
type ImageBlockProps = {
  src: string;           // 画像のURL
  alt: string;           // 代替テキスト
  caption?: string;      // キャプション（オプション）
  width?: number;        // 画像の幅（オプション）
  height?: number;       // 画像の高さ（オプション）
};

// 使用例
const image: Block = {
  id: 'example-image',
  type: 'image',
  props: {
    src: '/images/example.png',
    alt: '例示画像',
    caption: '図1: システム構成図',
    width: 800,
    height: 600
  }
};
```

### QuoteBlock

引用のためのブロックです。引用元の情報もサポートします。

```typescript
type QuoteBlockProps = {
  content: string;      // 引用テキスト
  cite?: string;        // 引用元（オプション）
  citeUrl?: string;     // 引用元URL（オプション）
};

// 使用例
const quote: Block = {
  id: 'example-quote',
  type: 'quote',
  props: {
    content: 'これは引用テキストです。',
    cite: '参考文献',
    citeUrl: 'https://example.com'
  }
};
```

### CalloutBlock

重要な情報や注意事項を目立たせるためのブロックです。Markdownフォーマットをサポートしており、リッチなコンテンツ表示が可能です。

```typescript
type CalloutBlockType = 'info' | 'warning' | 'error' | 'success';

type CalloutBlockProps = {
  type: CalloutBlockType;  // Calloutの種類
  title: string;          // タイトル
  content: string;        // 内容（Markdown形式サポート）
};

// 使用例
const callout: Block = {
  id: 'example-callout',
  type: 'callout',
  props: {
    type: 'warning',
    title: '注意',
    content: '**重要**: この操作は取り消すことができません。\n\n以下の点に注意してください：\n\n1. データのバックアップ\n2. 設定の確認\n3. [ドキュメント](https://example.com)の参照'
  }
};
```

Calloutブロックでは以下のMarkdown記法がサポートされています：

- **太字** (`**text**`)
- *イタリック* (`*text*`)
- [リンク](`[text](url)`)
- リスト（箇条書きと番号付き）
- `インラインコード`
- その他のMarkdown記法

### TableBlock

表形式のデータを表示するためのブロックです。

```typescript
type TableBlockProps = {
  headers: string[];         // テーブルヘッダー
  rows: string[][];         // テーブルデータ
  caption?: string;         // テーブルキャプション（オプション）
};

// 使用例
const table: Block = {
  id: 'example-table',
  type: 'table',
  props: {
    headers: ['項目', '説明'],
    rows: [
      ['項目1', '説明1'],
      ['項目2', '説明2']
    ],
    caption: 'テーブル1: 項目の説明'
  }
};
```

## 新しいブロックタイプの追加方法

1. 型定義の追加（`types/blog.ts`）:
```typescript
export type NewBlockProps = {
  // プロパティを定義
};

export type NewBlock = BaseBlock<'new-block', NewBlockProps>;
```

2. コンポーネントの作成:
```typescript
const NewBlock: FC<NewBlockProps> = (props) => {
  // コンポーネントの実装
};
```

3. BlockRendererへの追加:
```typescript
case 'new-block':
  return <NewBlock {...block.props} />;
```

## ベストプラクティス

1. **型安全性の維持**
   - すべてのプロパティに適切な型を定義する
   - 必須プロパティと任意プロパティを明確に区別する

2. **エラー処理**
   - 必要なプロパティが欠けている場合の適切なフォールバック
   - 無効な値に対する適切なバリデーション

3. **アクセシビリティ**
   - 適切なARIAラベルの使用
   - キーボードナビゲーションのサポート

4. **レスポンシブ対応**
   - モバイルファーストの設計
   - 適切なブレークポイントの使用

---

🔍 詳細な実装については、各コンポーネントのソースコードを参照してください。