import { type FC } from 'react';
import { type TextBlockProps } from '@/types/blog';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

const TextBlock: FC<TextBlockProps> = ({ content, align = 'left' }) => {
  return (
    <div
      className={cn(
        'prose prose-zinc dark:prose-invert max-w-none mb-6',
        'prose-p:my-0 prose-p:leading-7',
        'prose-li:my-0 prose-li:leading-7',
        'prose-a:text-primary hover:prose-a:text-primary/80', // リンクのスタイル
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right'
        }
      )}
    >
      <ReactMarkdown
        components={{
          // 改行を保持したままレンダリング
          p: ({ node, children }) => {
            const content = node?.children[0]?.value;
            return (
              <p className="mb-4 last:mb-0">
                {content === '' ? '\u00A0' : children}
              </p>
            );
          },
          // リンクを新しいタブで開く
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default TextBlock;