import { FC } from 'react';
import { type CalloutBlockProps } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface StyleConfig {
  bg: string;
  border: string;
  title: string;
  text: string;
}

const styleConfigs: Record<CalloutBlockProps['type'], StyleConfig> = {
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
};

const CalloutBlock: FC<CalloutBlockProps> = ({ content, type = 'info', title }) => {
  const styles = styleConfigs[type];

  return (
    <div className={cn(
      styles.bg,
      styles.border,
      'border rounded-lg p-4 mb-6'
    )}>
      {title && (
        <div className={cn(
          'font-bold mb-2',
          styles.title
        )}>
          {title}
        </div>
      )}
      <div className={styles.text}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default CalloutBlock;