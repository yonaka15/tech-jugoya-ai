// ブロックの基本型
export type BaseBlock<T extends string, P = unknown> = {
  id: string;
  type: T;
  props: P;
};

// メタデータの型
export type BlogMeta = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  isDraft?: boolean;
  author: string;
};

// 各ブロックの Props 型
export type HeadingBlockProps = {
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
};

export type TextBlockProps = {
  content: string;
  align?: 'left' | 'center' | 'right';
};

export type ImageBlockProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type CodeBlockProps = {
  code: string;
  language: string;
  fileName?: string;
  highlight?: number[];
};

export type QuoteBlockProps = {
  content: string;
  author?: string;
  cite?: string;
};

export type CalloutBlockProps = {
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title?: string;
};

export type TableBlockProps = {
  headers: string[];
  rows: string[][];
  caption?: string;
};

// 具体的なブロック型
export type HeadingBlock = BaseBlock<'heading', HeadingBlockProps>;
export type TextBlock = BaseBlock<'text', TextBlockProps>;
export type ImageBlock = BaseBlock<'image', ImageBlockProps>;
export type CodeBlock = BaseBlock<'code', CodeBlockProps>;
export type QuoteBlock = BaseBlock<'quote', QuoteBlockProps>;
export type CalloutBlock = BaseBlock<'callout', CalloutBlockProps>;
export type TableBlock = BaseBlock<'table', TableBlockProps>;

// すべてのブロック型の Union 型
export type Block = 
  | HeadingBlock
  | TextBlock 
  | ImageBlock 
  | CodeBlock 
  | QuoteBlock 
  | CalloutBlock 
  | TableBlock;

// 記事全体の型
export type BlogPost = {
  meta: BlogMeta;
  blocks: Block[];
};

// ブロック作成のヘルパー関数型
export type BlockCreator<T extends Block> = (
  props: T['props'],
  id?: string
) => T;

// ブロック作成のヘルパー関数
export const createBlock = <T extends string, P>(
  type: T,
  props: P,
  id: string = crypto.randomUUID()
): BaseBlock<T, P> => ({
  id,
  type,
  props,
});

// 各ブロック型のファクトリ関数
export const createHeadingBlock: BlockCreator<HeadingBlock> = (props, id) =>
  createBlock('heading', props, id);

export const createTextBlock: BlockCreator<TextBlock> = (props, id) =>
  createBlock('text', props, id);

export const createImageBlock: BlockCreator<ImageBlock> = (props, id) =>
  createBlock('image', props, id);

export const createCodeBlock: BlockCreator<CodeBlock> = (props, id) =>
  createBlock('code', props, id);

export const createQuoteBlock: BlockCreator<QuoteBlock> = (props, id) =>
  createBlock('quote', props, id);

export const createCalloutBlock: BlockCreator<CalloutBlock> = (props, id) =>
  createBlock('callout', props, id);

export const createTableBlock: BlockCreator<TableBlock> = (props, id) =>
  createBlock('table', props, id);