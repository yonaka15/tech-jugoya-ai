import { type FC } from 'react';
import { type CalloutBlockProps } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

const CalloutBlock: FC<CalloutBlockProps> = ({ content, type = 'info', title }) => {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      title: 'text-blue-800',
      text: 'text-blue-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      title: 'text-yellow-800',
      text: 'text-yellow-700',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      title: 'text-red-800',
      text: 'text-red-700',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      title: 'text-green-800',
      text: 'text-green-700',
    },
  }[type] ?? styles.info;  // デフォルトとしてinfoのスタイルを使用

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-6`}>
      {title && (
        <h4 className={`${styles.title} font-semibold mb-2`}>{title}</h4>
      )}
      <div
        className={cn(
          styles.text,
          'prose prose-zinc dark:prose-invert max-w-none',
          'prose-p:my-0 prose-p:leading-7',
          'prose-li:my-0 prose-li:leading-7',
          'prose-a:text-primary hover:prose-a:text-primary/80'
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
    </div>
  );
};

export default CalloutBlock;