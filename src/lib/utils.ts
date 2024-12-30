/**
 * Simple utility to combine class names
 * @param classNames - Class names to combine
 * @returns Combined class names
 */
export function cn(...classNames: (string | undefined)[]) {
  return classNames.filter(Boolean).join(' ');
}