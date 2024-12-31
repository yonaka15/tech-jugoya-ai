# 型定義システム

このディレクトリには、tech.jugoya.aiで使用される型定義が含まれています。TypeScriptの高度な型システムを活用して、堅牢なブログシステムを実現しています。

## 型定義の概要

### ブロックの基本構造

すべてのブロックは`BaseBlock`型を基に実装されています：

```typescript
type BaseBlock<T extends string, P = unknown> = {
  id: string;     // ブロックの一意識別子
  type: T;        // ブロックタイプを表すリテラル型
  props: P;       // ブロック固有のプロパティ
};
```

このジェネリック型を使用することで:
- タイプセーフなブロックの作成
- プロパティの型チェック
- IDEによる補完サポート
が実現されています。

### メタデータ

記事のメタデータは`BlogMeta`型で定義されています：

```typescript
type BlogMeta = {
  title: string;          // 記事タイトル
  description: string;    // 記事の説明
  publishedAt: string;    // 公開日（ISO8601形式）
  updatedAt?: string;     // 更新日（オプション）
  tags: string[];         // タグの配列
  isDraft?: boolean;      // 下書きフラグ
  author: string;         // 著者名
};
```

### ブロックの種類

各ブロックタイプは、専用のプロパティ型とそれを使用したブロック型の2段階で定義されています：

```typescript
// プロパティの型定義
type TextBlockProps = {
  content: string;
  align?: 'left' | 'center' | 'right';
};

// ブロック型の定義
type TextBlock = BaseBlock<'text', TextBlockProps>;
```

### ブロックの Union 型

すべてのブロック型は`Block`型にユニオンされています：

```typescript
type Block = 
  | HeadingBlock
  | TextBlock 
  | ImageBlock 
  | CodeBlock 
  | QuoteBlock 
  | CalloutBlock 
  | TableBlock;
```

## ブロックの作成

### ファクトリ関数

各ブロックタイプには、型安全な作成を支援するファクトリ関数が用意されています：

```typescript
// ファクトリ関数の型定義
type BlockCreator<T extends Block> = (
  props: T['props'],
  id?: string
) => T;

// 使用例
const heading = createHeadingBlock({
  content: "見出し",
  level: 2,
  align: "left"
});
```

### ヘルパー関数

汎用的なブロック作成のためのヘルパー関数も提供されています：

```typescript
const createBlock = <T extends string, P>(
  type: T,
  props: P,
  id: string = crypto.randomUUID()
): BaseBlock<T, P> => ({
  id,
  type,
  props,
});
```

## 型の使用例

### 記事データの定義

```typescript
const post: BlogPost = {
  meta: {
    title: "TypeScriptの型システム",
    description: "TypeScriptの型システムについて解説します",
    publishedAt: "2024-01-01T00:00:00Z",
    tags: ["TypeScript", "プログラミング"],
    author: "yonaka"
  },
  blocks: [
    createHeadingBlock({
      content: "はじめに",
      level: 1,
      align: "left"
    }),
    createTextBlock({
      content: "TypeScriptの型システムは...",
      align: "left"
    })
  ]
};
```

### 新しいブロックタイプの追加

1. プロパティの型を定義：
```typescript
type NewBlockProps = {
  // プロパティを定義
};
```

2. ブロック型を定義：
```typescript
type NewBlock = BaseBlock<'new-block', NewBlockProps>;
```

3. Union型に追加：
```typescript
type Block = 
  | ExistingBlock
  | NewBlock;
```

4. ファクトリ関数を作成：
```typescript
export const createNewBlock: BlockCreator<NewBlock> = (props, id) =>
  createBlock('new-block', props, id);
```

## 型安全性のベストプラクティス

1. **リテラル型の活用**
   - 文字列の列挙には`type Level = 1 | 2 | 3 | 4 | 5 | 6`のようなリテラル型を使用
   - `align?: 'left' | 'center' | 'right'`のように、有効な値を明示的に制限

2. **オプショナルプロパティの適切な使用**
   - 必須でないプロパティには`?`を付与
   - デフォルト値が必要な場合は実装側で提供

3. **ジェネリック型の活用**
   - `BaseBlock`のような汎用的な型定義
   - 型パラメータによる柔軟な拡張性の確保

4. **Union型による網羅的な型チェック**
   - すべてのブロックタイプを`Block`型にユニオン
   - switch文での型チェックの活用

5. **ファクトリパターンの採用**
   - 型安全なブロック作成のためのヘルパー関数を提供
   - IDの自動生成などの共通機能を集約

## ユーティリティ型

必要に応じて以下のようなユーティリティ型を追加できます：

```typescript
// ブロックのプロパティを取得
type BlockProps<T extends Block> = T['props'];

// メタデータのキーを取得
type MetaKey = keyof BlogMeta;

// 必須のメタデータのみを抽出
type RequiredMeta = Required<BlogMeta>;
```