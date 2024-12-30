import { type FC } from 'react';
import { type TextBlockProps } from '@/types/blog';

const TextBlock: FC<TextBlockProps> = ({ content, align = 'left' }) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <div className={`prose max-w-none ${alignClass} mb-6`}>
      {content}
    </div>
  );
};

export default TextBlock;
