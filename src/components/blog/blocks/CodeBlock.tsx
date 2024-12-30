"use client";

import { type FC, useState, useCallback } from 'react';
import { type CodeBlockProps } from '@/types/blog';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from '@/lib/utils';

const CodeBlock: FC<CodeBlockProps> = ({ code, language, fileName, highlight = [] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="mb-6 rounded-lg overflow-hidden bg-zinc-950 not-prose group">
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <div className="text-sm text-zinc-400">
          {fileName || `${language} code`}
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'text-sm px-3 py-1 rounded-md transition-all duration-200',
            'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50',
            copied && 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300'
          )}
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code with syntax highlighting */}
      <div className="text-[15px]">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            backgroundColor: 'transparent',
            fontSize: 'inherit',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: '#666',
            userSelect: 'none',
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: highlight.includes(lineNumber)
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
              display: 'block',
              width: '100%',
            },
          })}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;