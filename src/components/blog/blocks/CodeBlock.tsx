import { type FC } from 'react';
import { type CodeBlockProps } from '@/types/blog';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeBlock: FC<CodeBlockProps> = ({ code, language, fileName, highlight = [] }) => {
  return (
    <div className="mb-6 not-prose">
      {fileName && (
        <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm rounded-t-lg border-b border-gray-700">
          {fileName}
        </div>
      )}
      <div className={`${fileName ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden`}>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers
          wrapLines
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: highlight.includes(lineNumber) ? 'rgba(255,255,255,0.1)' : 'transparent',
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