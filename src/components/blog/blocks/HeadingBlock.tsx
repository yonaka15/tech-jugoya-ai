import type { FC } from 'react';
import type { HeadingBlockProps } from '@/types/blog';
import { cn } from '@/lib/utils';

const HeadingBlock: FC<HeadingBlockProps> = ({ content, level, align = 'left' }) => {
  const baseStyles = cn(
    'font-bold tracking-tight',
    align === 'left' ? 'text-left' : align === 'center' ? 'text-center' : 'text-right'
  );

  const styles = {
    1: 'text-4xl mt-8 mb-6',
    2: 'text-3xl mt-7 mb-5',
    3: 'text-2xl mt-6 mb-4',
    4: 'text-xl mt-5 mb-3',
    5: 'text-lg mt-4 mb-2',
    6: 'text-base mt-3 mb-2'
  }[level];

  const Tag = `h${level}` as const;

  return (
    <Tag className={cn(baseStyles, styles)}>
      {content}
    </Tag>
  );
};

export default HeadingBlock;