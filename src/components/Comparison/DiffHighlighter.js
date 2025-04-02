import React, { useState } from 'react';
import { diffWords } from 'diff';

const DiffHighlighter = ({ responses }) => {
  const [baseResponseIndex, setBaseResponseIndex] = useState(0);
  const [comparisonIndex, setComparisonIndex] = useState(
    responses.length > 1 ? 1 : 0
  );

  if (responses.length < 2) {
    return (
      <div className="text-gray-500 dark:text-gray-400">
        At least two responses are needed for comparison.
      </div>
    );
  }

  const baseResponse = responses[baseResponseIndex];
  const comparisonResponse = responses[comparisonIndex];

  const differences = diffWords(
    baseResponse.content,
    comparisonResponse.content
  );

  const handleBaseChange = (e) => {
    const newBaseIndex = parseInt(e.target.value);
    setBaseResponseIndex(newBaseIndex);
    
    // If the comparison index is now the same as the base index, change it
    if (comparisonIndex === newBaseIndex) {
      setComparisonIndex(newBaseIndex === 0 ? 1 : 0);
    }
  };

  const handleComparisonChange = (e) => {
    const newComparisonIndex = parseInt(e.target.value);
    setComparisonIndex(newComparisonIndex);
    
    // If the base index is now the same as the comparison index, change it
    if (baseResponseIndex === newComparisonIndex) {
      setBaseResponseIndex(newComparisonIndex === 0 ? 1 : 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Base Response
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={baseResponseIndex}
            onChange={handleBaseChange}
          >
            {responses.map((response, index) => (
              <option key={response.id} value={index}>
                {response.model}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Comparison Response
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={comparisonIndex}
            onChange={handleComparisonChange}
          >
            {responses.map((response, index) => (
              <option key={response.id} value={index} disabled={index === baseResponseIndex}>
                {response.model}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Difference Highlighting
        </h3>
        
        <div className="text-gray-800 dark:text-gray-200">
          {differences.map((part, index) => (
            <span
              key={index}
              className={`${
                part.added
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : part.removed
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : ''
              }`}
            >
              {part.value}
            </span>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {baseResponse.model}
          </h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {baseResponse.content}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {comparisonResponse.model}
          </h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {comparisonResponse.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffHighlighter;
