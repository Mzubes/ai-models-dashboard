import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const ResponseCard = ({ response, prompt }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(response.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{response.model}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(response.timestamp || Date.now())}
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ClipboardDocumentIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Prompt:</div>
          <div className="text-gray-800 dark:text-gray-200 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded">
            {prompt}
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Response:</div>
          <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {response.content}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          {response.usage && (
            <span>Tokens: {response.usage.total_tokens}</span>
          )}
          {response.metadata && response.metadata.latency && (
            <span>Latency: {response.metadata.latency}ms</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
