// src/components/history/CategoryManager.js - Fixed version
import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const CategoryManager = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onCreateCategory, 
  onDeleteCategory 
}) => {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onCreateCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={!newCategory.trim()}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </form>
      
      <div className="space-y-2">
        <button
          className={`w-full p-2 text-left rounded-md ${
            selectedCategory === 'all'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelectCategory('all')}
        >
          All Queries
        </button>
        
        <button
          className={`w-full p-2 text-left rounded-md ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelectCategory(null)}
        >
          Uncategorized
        </button>
        
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <button
              className={`flex-1 p-2 text-left rounded-md ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
            <button
              className="p-1 ml-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              onClick={() => {
                // Fixed line - using window.confirm instead of just confirm
                if (window.confirm(`Are you sure you want to delete the category "${category}"?`)) {
                  onDeleteCategory(category);
                }
              }}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
