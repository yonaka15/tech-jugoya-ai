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
        'prose-a:text-primary hover:prose-a:text-primary/80',
        align === 'left' ? 'text-left' : 
        align === 'center' ? 'text-center' : 
        align === 'right' ? 'text-right' : 'text-left'
      )}
    >
      <ReactMarkdown
        components={{
          p: ({ children, ...props }) => {
            const content = props.node?.children[0]?.value;
            return (
              <p className="mb-4 last:mb-0">
                {content === '' ? '\u00A0' : children}
              </p>
            );
          },
          a: ({ ...props }) => (
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