import { type FC } from 'react';
import { type QuoteBlockProps } from '@/types/blog';

const QuoteBlock: FC<QuoteBlockProps> = ({ content, author, cite }) => {
  return (
    <figure className="mb-6">
      <blockquote className="text-xl italic font-semibold text-gray-900 border-l-4 border-gray-300 pl-4">
        <p className="mb-2">{content}</p>
      </blockquote>
      {(author || cite) && (
        <figcaption className="text-sm text-gray-600 pl-4">
          {author && <span className="font-semibold">{author}</span>}
          {author && cite && <span className="mx-1">—</span>}
          {cite && <cite>{cite}</cite>}
        </figcaption>
      )}
    </figure>
  );
};

export default QuoteBlock;
