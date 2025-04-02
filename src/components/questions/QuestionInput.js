import React from 'react';

const QuestionInput = ({ value, onChange, onSubmit, isLoading }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows="5"
        placeholder="Enter your question here..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      ></textarea>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Press Ctrl+Enter to submit
        </div>
        
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default QuestionInput;
