import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { Clipboard, Check } from 'lucide-react';

const ResponseCard = ({ response, modelName, providerLogo }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img src={providerLogo} alt="provider-logo" className="h-6 w-6 rounded-md" />
          <span className="font-semibold">{modelName}</span>
        </div>
        <button onClick={handleCopy} className="hover:text-green-400">
          {copied ? <Check size={18} /> : <Clipboard size={18} />}
        </button>
      </div>

      <div className={`prose prose-invert ${expanded ? '' : 'max-h-48 overflow-hidden'}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {response}
        </ReactMarkdown>
      </div>

      {response.length > 500 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400 mt-2 underline"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default ResponseCard;
