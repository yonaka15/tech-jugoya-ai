'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import type { MermaidBlockProps } from '@/types/blog';

export function MermaidDiagramInner({ content, caption, theme = 'default' }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Mermaidの初期化を一度だけ行う
    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: 'strict',
      fontFamily: 'var(--font-geist-sans)',
    });

    async function renderDiagram() {
      if (!containerRef.current) return;

      try {
        // ユニークなIDを生成（より短くシンプルに）
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;

        // 図の描画
        const { svg } = await mermaid.render(id, content);
        
        if (mounted) {
          setSvg(svg);
        }
      } catch (e) {
        console.error('Mermaid rendering error:', e);
        if (mounted) {
          setError(e instanceof Error ? e.message : 'Failed to render diagram');
        }
      }
    }

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [content, theme]);

  if (error) {
    return (
      <div className="my-6">
        <div className="w-full max-w-4xl mx-auto bg-red-50 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <p className="text-red-600 mb-2">Failed to render diagram</p>
            <pre className="text-sm bg-white p-4 rounded border border-red-200 overflow-x-auto">
              {content}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div 
          ref={containerRef}
          className="p-4 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        {caption && (
          <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 text-center border-t">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}

export default MermaidDiagramInner;