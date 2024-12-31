'use client';

import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { MermaidBlockProps } from '@/types/blog';

// Mermaidの初期設定
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'var(--font-geist-sans)',
});

function generateStableId(content: string): string {
  const inputString = content.trim().substring(0, 50); // 最初の50文字を使用
  return `mermaid-${Buffer.from(inputString).toString('base64').replace(/[+/=]/g, '').substring(0, 8)}`;
}

export const MermaidBlock: React.FC<MermaidBlockProps> = ({ content, caption, theme = 'default' }) => {
  const stableId = generateStableId(content);

  useEffect(() => {
    // DOMが完全に読み込まれた後にMermaidを実行
    window.requestAnimationFrame(() => {
      try {
        mermaid.run({
          querySelector: `#${stableId}`,
        });
      } catch (error) {
        console.error('Mermaid rendering error:', error);
      }
    });
  }, [stableId, content, theme]);

  return (
    <div className="my-6">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4">
          <div id={stableId} className="mermaid" data-theme={theme}>
            {content}
          </div>
        </div>
        {caption && (
          <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 text-center border-t">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};

export default MermaidBlock;