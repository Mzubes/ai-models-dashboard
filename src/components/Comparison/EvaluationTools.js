// src/components/comparison/EvaluationTools.js
import React from 'react';

const categories = [
  { id: 'accuracy', label: 'Accuracy' },
  { id: 'relevance', label: 'Relevance' },
  { id: 'clarity', label: 'Clarity' },
  { id: 'overall', label: 'Overall' },
];

const EvaluationTools = ({ responseId, ratings, onRatingChange }) => {
  return (
    <div className="space-y-4">
      {categories.map(category => (
        <div key={category.id} className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {category.label}
            </label>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {ratings[category.id]}
            </span>
          </div>
          
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={ratings[category.id]}
            onChange={(e) => onRatingChange(responseId, category.id, parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvaluationTools;
