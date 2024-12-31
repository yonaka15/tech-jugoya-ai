# コンテンツ管理

このディレクトリには、tech.jugoya.aiのコンテンツデータが含まれています。

## ディレクトリ構造

```
content/
├── blog/                   # ブログ関連のその他のデータ
├── posts/                  # 記事データ（JSON形式）
│   ├── single-post.json   # 単一ファイル記事
│   └── multi-part-post/   # 分割された記事
│       ├── index.json     # メタ情報とブロックの順序
│       ├── intro.json     # 導入部のブロック
│       └── main.json      # 本文のブロック
└── LICENSE                # CC BY-NC-ND 4.0ライセンス
```

## 記事データの構造

記事は単一のJSONファイルとして作成するか、複数のファイルに分割して管理できます。

### ファイル命名規則

- ファイル/ディレクトリ名はURLスラッグとして使用されます
- 小文字の英数字とハイフンのみを使用してください
- 例: 
  - 単一ファイル: `getting-started-with-nextjs.json`
  - 分割ファイル: `getting-started-with-nextjs/index.json`

### 単一ファイル形式

1つのJSONファイルに記事全体を含める形式です：

```json
{
  "meta": {
    "title": "記事タイトル",
    "description": "記事の説明（SEOにも使用）",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "tags": ["Next.js", "TypeScript"],
    "author": {
      "name": "著者名",
      "avatar": "/images/avatars/author.png"
    }
  },
  "blocks": [
    {
      "id": "unique-id",
      "type": "text",
      "props": {
        "content": "本文...",
        "align": "left"
      }
    }
  ]
}
```

### 分割ファイル形式

長い記事は複数のファイルに分割して管理できます。この場合、`index.json`にメタ情報とブロックの順序を定義し、各パートの内容は別ファイルに記述します：

```json
// index.json - メタ情報とブロックの順序
{
  "meta": {
    "title": "長い記事のタイトル",
    "description": "記事の説明",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "tags": ["Next.js", "TypeScript"]
  },
  "blocks": [
    {
      "id": "introduction",
      "type": "introduction",
      "props": {}
    },
    {
      "id": "main-content",
      "type": "main-content",
      "props": {}
    }
  ]
}

// introduction.json - 各パートのブロック
{
  "blocks": [
    {
      "id": "intro-text",
      "type": "text",
      "props": {
        "content": "導入部の本文...",
        "align": "left"
      }
    }
  ]
}
```

### メタデータフィールド

| フィールド | 必須 | 説明 |
|------------|------|------|
| title | ✅ | 記事のタイトル（100文字以内） |
| description | ✅ | 記事の説明文（SEO用、200文字以内） |
| publishedAt | ✅ | 公開日時（ISO 8601形式） |
| tags | ✅ | タグの配列（1つ以上必須） |
| author | - | 著者情報（オプション） |

### タグの命名規則

- 技術スタックは正式名称を使用（例: "Next.js", "TypeScript"）
- カテゴリータグは日本語可（例: "チュートリアル", "ベストプラクティス"）
- タグは先頭を大文字に統一

## Mermaidダイアグラムの使用

Next.jsでMermaidを使用する場合、以下の点に注意が必要です：

### 考慮すべき問題
1. ハイドレーションエラー
   - サーバーサイドレンダリング（SSR）とクライアントサイドレンダリングの不一致
   - Mermaidの初期化タイミングの問題
2. スタイリングの整合性
   - フォントやカラースキームの不一致
   - CSSの適用タイミング

### 解決策
1. **シンプルなグラフ構造の使用**
   - 複雑なスタイリングを避ける
   - 基本的なフローチャート要素の使用

2. **テキストベースの代替説明**
   - 複雑なダイアグラムには補足テキストを追加
   - 箇条書きでの構造説明

3. **クライアントサイドレンダリング**
```typescript
// mermaid-component.tsx
'use client';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export const MermaidDiagram = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 既存の内容をクリア
      containerRef.current.innerHTML = '';

      // Mermaidの初期化（毎回初期化して競合を防ぐ）
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'strict'
      });

      // ユニークなID生成
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      // 非同期でレンダリング
      mermaid.render(id, content)
        .then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch(error => {
          console.error('Mermaid rendering failed:', error);
          // エラー時は代替表示
          if (containerRef.current) {
            containerRef.current.innerHTML = 
              `<pre class="text-sm bg-gray-100 p-4 rounded">${content}</pre>`;
          }
        });
    }
  }, [content]);

  return <div ref={containerRef} className="overflow-x-auto my-4" />;
};
```

## 画像の管理

- 記事関連の画像は`public/images/blog/[記事のスラッグ]/`に配置
- 画像ファイル名は英数字とハイフンのみを使用
- 推奨する画像形式:
  - 写真: JPEG
  - スクリーンショット: PNG
  - アイコン・図: SVG
- 画像の最大サイズ:
  - 幅: 1200px
  - ファイルサイズ: 500KB

## 記事の作成フロー

### 単一ファイル記事の場合

1. 新しいJSONファイルを作成
2. メタデータを設定
3. ブロックを追加
4. 画像を配置（必要な場合）
5. プレビューで確認
6. 公開

### 分割ファイル記事の場合

1. 記事用のディレクトリを作成
2. index.jsonでメタデータとブロックの順序を定義
3. 各パートのJSONファイルを作成
4. 画像を配置（必要な場合）
5. プレビューで確認
6. 公開

### ブロックの追加

- 各ブロックには一意のIDを設定
- 利用可能なブロックタイプは[ブロックシステムのドキュメント](../components/blog/blocks/README.md)を参照

## スタイルガイド

### 記事タイトル
- 簡潔で具体的に
- 検索しやすい用語を使用
- 40文字以内を推奨

### 本文
- 段落は適度な長さに分割
- 重要な用語は太字（`**bold**`）で強調
- コードは適切にフォーマット
- Calloutブロックは最小限に抑える
  - 本当に注意が必要な事項のみに使用
  - 通常のテキストで十分な場合はCalloutを避ける
  - 連続したCalloutの使用は避ける
  - アラート、警告、重要な注意事項など、真に強調が必要な情報に限定

### 画像
- 必ず代替テキストを設定
- キャプションは簡潔に内容を説明
- スクリーンショットは必要な部分のみをトリミング

## ライセンス

このディレクトリ内のすべてのコンテンツは [CC BY-NC-ND 4.0](./LICENSE) ライセンスの下で提供されています。

- ✅ 記事の閲覧・共有可能
- ✅ 非商用目的での使用可能
- ❌ 商用利用禁止
- ❌ 改変禁止
- ℹ️ 著作権表示が必要