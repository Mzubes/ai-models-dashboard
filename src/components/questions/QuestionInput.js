import React, { useState } from 'react';

const QuestionInput = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim() !== '') {
        onSubmit(prompt);
        setPrompt('');
      }
    }
  };

  const handleSubmit = () => {
    if (prompt.trim() !== '') {
      onSubmit(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
        placeholder="Ask a question…"
        className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading || prompt.trim() === ''}
          className={`px-5 py-2 rounded-md font-medium ${
            loading
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default QuestionInput;