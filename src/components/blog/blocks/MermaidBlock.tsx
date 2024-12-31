'use client';

import dynamic from 'next/dynamic';
import { type MermaidBlockProps } from '@/types/blog';

const LoadingDiagram = () => (
  <div className="my-6 animate-pulse bg-gray-100 h-32 rounded" />
);

const DynamicMermaidDiagram = dynamic(
  () => import('./MermaidDiagramInner').then(mod => mod.MermaidDiagramInner),
  {
    loading: LoadingDiagram,
    ssr: false, // SSRを無効化
  }
);

export const MermaidBlock: React.FC<MermaidBlockProps> = (props) => {
  return <DynamicMermaidDiagram {...props} />;
};

export default MermaidBlock;