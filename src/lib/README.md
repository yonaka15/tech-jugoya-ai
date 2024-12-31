# ユーティリティ関数

このディレクトリには、tech.jugoya.aiで使用される共通のユーティリティ関数が含まれています。

## ファイル構成

- `blog.ts`: ブログ記事の取得と管理に関する関数
- `utils.ts`: 汎用的なユーティリティ関数

## ブログ関連ユーティリティ（blog.ts）

### 型定義

```typescript
type PostWithSlug = BlogPost & { slug: string };
```

記事データに`slug`フィールドを追加した型です。一覧表示やリンク生成時に使用されます。

### 記事取得関数

#### `getPost`

指定されたスラッグの記事を取得します。単一ファイルの記事と分割された記事の両方に対応しています。

```typescript
async function getPost(slug: string): Promise<BlogPost | null>
```

- **引数**: `slug` - 記事のスラッグ（ファイル名または記事ディレクトリ名）
- **戻り値**: 記事データ、または見つからない場合は`null`
- **サポートする形式**:
  1. 単一ファイル: `posts/article-name.json`
  2. 分割ファイル: `posts/article-name/index.json` + パーツファイル
- **動作**:
  - 単一ファイルの場合は直接読み込み
  - 分割ファイルの場合はindex.jsonのblocksの指定に従ってパーツファイルを読み込み・結合
- **使用例**:
```typescript
// 単一ファイル記事の取得
const post = await getPost('getting-started');

// 分割ファイル記事の取得（内部で自動的にパーツを結合）
const longPost = await getPost('comprehensive-guide');
```

#### `getAllPosts`

すべての記事を取得し、公開日順にソートします。単一ファイルと分割ファイルの両方の記事を含みます。

```typescript
async function getAllPosts(): Promise<PostWithSlug[]>
```

- **戻り値**: スラッグ付きの記事データの配列（公開日の降順）
- **特徴**:
  - 非公開（ドラフト）記事は除外
  - 単一ファイル・分割ファイルの両方をサポート
  - エラーが発生した場合は空配列を返却
  - 自動的に公開日でソート
- **使用例**:
```typescript
const posts = await getAllPosts();
const recentPosts = posts.slice(0, 5); // 最新5件
```

#### `getAllTags`

すべての記事から使用されているタグを抽出します。

```typescript
async function getAllTags(): Promise<string[]>
```

- **戻り値**: ユニークなタグの配列（アルファベット順）
- **特徴**:
  - 重複を自動的に除去
  - アルファベット順にソート
  - 単一ファイル・分割ファイル両方の記事から収集
- **使用例**:
```typescript
const tags = await getAllTags();
const tagCloud = tags.map(tag => ({
  name: tag,
  count: posts.filter(post => post.meta.tags.includes(tag)).length
}));
```

#### `getPostsByTag`

指定されたタグを持つ記事を取得します。

```typescript
async function getPostsByTag(tag: string): Promise<PostWithSlug[]>
```

- **引数**: `tag` - フィルタリングするタグ
- **戻り値**: 指定されたタグを持つ記事の配列
- **使用例**:
```typescript
const nextjsPosts = await getPostsByTag('Next.js');
```

### エラーハンドリング

すべての関数は、エラーが発生した場合でもアプリケーションを停止させないように設計されています：

- `getPost`: `null`を返却
- `getAllPosts`: 空配列を返却
- `getAllTags`: 空配列を返却
- `getPostsByTag`: 空配列を返却

エラーはコンソールにログ出力され、デバッグを支援します。

## 汎用ユーティリティ（utils.ts）

### クラス名結合（`cn`）

複数のクラス名を結合するシンプルなユーティリティ関数です。

```typescript
function cn(...classNames: (string | undefined)[]): string
```

- **引数**: クラス名（文字列または`undefined`）の可変長引数
- **戻り値**: スペースで結合されたクラス名の文字列
- **特徴**:
  - `undefined`や空文字列は自動的に除外
  - TailwindCSSと相性が良い
- **使用例**:
```typescript
// 基本的な使用法
const className = cn('text-lg', 'font-bold');
// => "text-lg font-bold"

// 条件付きクラス
const className = cn(
  'base-class',
  isActive && 'active',
  isBig ? 'text-lg' : 'text-base'
);

// コンポーネントでの使用
function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        'bg-blue-500 hover:bg-blue-600',
        className
      )}
      {...props}
    />
  );
}
```

## ベストプラクティス

1. **エラー処理**
   - すべての非同期操作は`try/catch`でラップ
   - エラーはログ出力し、安全なフォールバック値を返却

2. **型安全性**
   - すべての関数は適切な型定義を持つ
   - ジェネリック型を活用して柔軟性を確保

3. **パフォーマンス**
   - ファイルI/Oは必要最小限に
   - キャッシュを活用（実装予定）

4. **拡張性**
   - 関数は単一責任の原則に従う
   - 将来の機能追加を考慮した設計

## 今後の改善予定

1. **キャッシング機能**
   - 記事データのメモリキャッシュ
   - タグ一覧のキャッシュ

2. **検索機能**
   - タイトルと本文の全文検索
   - タグベースの高度な検索

3. **パフォーマンス最適化**
   - 記事データのバッチ読み込み
   - インデックスの作成

4. **バリデーション**
   - 記事データの形式チェック
   - タグの正規化