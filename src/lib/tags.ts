/**
 * タグをURL用にフォーマットする
 * - 小文字に変換
 * - 空白をハイフンに置換
 * - 前後の空白を削除
 */
export function formatTagForUrl(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * URLフォーマットされたタグが一致するか確認
 */
export function isTagMatch(originalTag: string, urlFormattedTag: string): boolean {
  return formatTagForUrl(originalTag) === urlFormattedTag;
}