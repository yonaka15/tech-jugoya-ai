import { type FC } from 'react';
import { type CalloutBlockProps } from '@/types/blog';

const CalloutBlock: FC<CalloutBlockProps> = ({ content, type, title }) => {
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
  }[type];

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-6`}>
      {title && (
        <h4 className={`${styles.title} font-semibold mb-2`}>{title}</h4>
      )}
      <div className={`${styles.text}`}>{content}</div>
    </div>
  );
};

export default CalloutBlock;
