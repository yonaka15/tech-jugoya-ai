import { type FC } from 'react';
import { type CodeBlockProps } from '@/types/blog';

const CodeBlock: FC<CodeBlockProps> = ({ code, language, fileName, highlight = [] }) => {
  return (
    <div className="mb-6">
      {fileName && (
        <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm rounded-t-lg border-b border-gray-700">
          {fileName}
        </div>
      )}
      <pre className={`${fileName ? 'rounded-b-lg' : 'rounded-lg'} bg-gray-800 p-4 overflow-x-auto`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
