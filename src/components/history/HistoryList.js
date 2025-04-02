// src/components/history/HistoryList.js
import React, { useState } from 'react';
import { TrashIcon, TagIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
// Removed unused ArrowPathIcon

const HistoryList = ({ historyItems, categories, onAssignCategory, onDeleteItem, onViewInComparison }) => {
  // Rest of the code stays the same
  const [expandedItems, setExpandedItems] = useState({});
  
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (historyItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No history items found matching your criteria.
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-4">
      {historyItems.map((item) => (
        <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div 
            className="p-4 bg-gray-50 dark:bg-gray-750 flex justify-between items-start cursor-pointer"
            onClick={() => toggleExpand(item.id)}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatDate(item.timestamp)}
                </span>
                {item.category && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="mt-2 text-gray-700 dark:text-gray-300">
                {expandedItems[item.id] ? item.prompt : truncateText(item.prompt)}
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  const category = prompt('Assign to category:', item.category || '');
                  if (category !== null) {
                    onAssignCategory(item.id, category);
                  }
                }}
                title="Assign to category"
              >
                <TagIcon className="h-5 w-5" />
              </button>
              
              <button
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewInComparison(item);
                }}
                title="View in comparison"
              >
                <ArrowsRightLeftIcon className="h-5 w-5" />
              </button>
              
              <button
                className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Are you sure you want to delete this item?')) {
                    onDeleteItem(item.id);
                  }
                }}
                title="Delete"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {expandedItems[item.id] && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prompt:</h4>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200">
                    {item.prompt}
                  </div>
                </div>
                
                {item.responses && item.responses.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Responses:</h4>
                    <div className="space-y-3">
                      {item.responses.map((response, index) => (
                        <div key={response.id || index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">{response.model}</span>
                            {response.usage && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {response.usage.total_tokens} tokens
                              </span>
                            )}
                          </div>
                          <div className="text-gray-800 dark:text-gray-200">
                            {truncateText(response.content, 300)}
                            {response.content.length > 300 && (
                              <button 
                                className="ml-1 text-blue-600 dark:text-blue-400 text-sm"
                                onClick={() => onViewInComparison(item)}
                              >
                                View full response
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
