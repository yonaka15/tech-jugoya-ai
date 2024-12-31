'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import type { MermaidBlockProps } from '@/types/blog';

export function MermaidDiagramInner({ content, caption, theme = 'default' }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;
      
      try {
        // Clear previous content
        containerRef.current.innerHTML = '';

        // Initialize mermaid with current theme
        mermaid.initialize({
          startOnLoad: true,
          theme: theme,
          securityLevel: 'strict',
          fontFamily: 'var(--font-geist-sans)',
        });

        // Generate unique ID based on content
        const id = `mermaid-${Buffer.from(content).toString('base64').slice(0, 8)}`;

        // Render new diagram
        const { svg } = await mermaid.render(id, content);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderDiagram();
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
        <div className="p-4">
          <div ref={containerRef} className="overflow-x-auto" />
        </div>
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