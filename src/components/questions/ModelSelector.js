import React from 'react';
import { useModels } from '../../contexts/ModelContext';

const ModelSelector = () => {
  const { 
    models, 
    selectedModels, 
    toggleModelSelection, 
    selectAllModels, 
    clearModelSelection 
  } = useModels();

  // Group models by provider
  const groupedModels = models.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          onClick={selectAllModels}
        >
          Select All
        </button>
        <button
          className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          onClick={clearModelSelection}
        >
          Clear All
        </button>
      </div>
      
      {Object.entries(groupedModels).map(([provider, providerModels]) => (
        <div key={provider} className="mb-4">
          <h3 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300 capitalize">
            {provider}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {providerModels.map((model) => (
              <div
                key={model.id}
                className={`
                  border rounded-md p-3 cursor-pointer transition-colors
                  ${
                    selectedModels.includes(model.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400'
                      : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'
                  }
                  ${!model.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={() => model.isAvailable && toggleModelSelection(model.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{model.name}</div>
                    {model.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {model.description}
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(model.id)}
                      onChange={() => model.isAvailable && toggleModelSelection(model.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={!model.isAvailable}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelSelector;
