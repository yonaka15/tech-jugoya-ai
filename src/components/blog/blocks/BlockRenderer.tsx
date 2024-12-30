import { type FC } from 'react';
import { type Block } from '@/types/blog';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import CodeBlock from './CodeBlock';
import QuoteBlock from './QuoteBlock';
import CalloutBlock from './CalloutBlock';
import TableBlock from './TableBlock';
import HeadingBlock from './HeadingBlock';

interface BlockRendererProps {
  block: Block;
}

const BlockRenderer: FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock {...block.props} />;
    case 'text':
      return <TextBlock {...block.props} />;
    case 'image':
      return <ImageBlock {...block.props} />;
    case 'code':
      return <CodeBlock {...block.props} />;
    case 'quote':
      return <QuoteBlock {...block.props} />;
    case 'callout':
      return <CalloutBlock {...block.props} />;
    case 'table':
      return <TableBlock {...block.props} />;
    default:
      console.warn(`Unknown block type: ${(block as Block).type}`);
      return null;
  }
};

export default BlockRenderer;