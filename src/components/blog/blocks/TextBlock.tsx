import { type FC } from 'react';
import { type TextBlockProps } from '@/types/blog';
import { cn } from '@/lib/utils';

const TextBlock: FC<TextBlockProps> = ({ content, align = 'left' }) => {
  // 改行を保持したまま表示するための処理
  const formattedContent = content.split('\n').map((line, index) => (
    <p key={index} className="mb-4 last:mb-0">
      {line || '\u00A0'} {/* 空行の場合は改行を保持 */}
    </p>
  ));

  return (
    <div
      className={cn(
        'prose prose-zinc dark:prose-invert max-w-none mb-6',
        'prose-p:my-0 prose-p:leading-7',
        'prose-li:my-0 prose-li:leading-7',
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right'
        }
      )}
    >
      {formattedContent}
    </div>
  );
};

export default TextBlock;