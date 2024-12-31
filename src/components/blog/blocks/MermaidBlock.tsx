'use client';

import dynamic from 'next/dynamic';
import { type MermaidBlockProps } from '@/types/blog';

// Loadingコンポーネントを別で定義
const LoadingDiagram = () => (
  <div className="my-6">
    <div className="w-full max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="animate-pulse bg-gray-200 h-32 rounded" />
      </div>
    </div>
  </div>
);

// Dynamic importの設定
const DynamicMermaidDiagram = dynamic(
  () => import('./MermaidDiagramInner'),
  {
    loading: LoadingDiagram,
  }
);

export const MermaidBlock: React.FC<MermaidBlockProps> = (props) => {
  return <DynamicMermaidDiagram {...props} />;
};

export default MermaidBlock;