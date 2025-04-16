import React, { useState, useMemo } from 'react';

function ModelSelector({ models, defaultSelected = [], onSelectionChange }) {
  // State for search term and selected model IDs
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModels, setSelectedModels] = useState(defaultSelected);

  // Filter and group models by provider based on search term
  const groupedModels = useMemo(() => {
    const term = searchTerm.toLowerCase();
    // Filter models where provider or name includes the search term
    const filtered = models.filter(model =>
      model.name.toLowerCase().includes(term) ||
      model.provider.toLowerCase().includes(term)
    );
    // Group filtered models by provider
    const groups = filtered.reduce((acc, model) => {
      const prov = model.provider;
      if (!acc[prov]) acc[prov] = [];
      acc[prov].push(model);
      return acc;
    }, {});
    // Convert to array of { provider, models } and sort groups alphabetically
    return Object.keys(groups).sort().map(provider => ({
      provider,
      models: groups[provider]
    }));
  }, [models, searchTerm]);

  // Handler to toggle selection of a model
  const handleToggleModel = (modelId) => {
    let newSelected;
    if (selectedModels.includes(modelId)) {
      // Remove if already selected
      newSelected = selectedModels.filter(id => id !== modelId);
    } else {
      // Add to selection
      newSelected = [...selectedModels, modelId];
    }
    setSelectedModels(newSelected);
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  return (
    <div className="max-w-md"> {/* Container can be adjusted to parent layout */}
      {/* Search input */}
      <label htmlFor="modelSearch" className="sr-only">Search models</label>
      <input
        id="modelSearch"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search models..."
        className="w-full mb-3 px-3 py-2 rounded-md border border-gray-300 
                   text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search models"
      />

      {/* Scrollable models list */}
      <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md p-2">
        {groupedModels.map(group => (
          <fieldset key={group.provider} className="mb-4">
            <legend className="px-1.5 py-1 text-gray-700 font-medium">
              {group.provider}
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-1.5 py-1">
              {group.models.map(model => (
                <label 
                  key={model.id} 
                  className={`flex items-center rounded-md px-2 py-1 cursor-pointer 
                             hover:bg-gray-100 
                             ${selectedModels.includes(model.id) ? 'bg-blue-50' : 'bg-white'}`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    checked={selectedModels.includes(model.id)}
                    onChange={() => handleToggleModel(model.id)}
                  />
                  <span className="ml-2 text-sm text-gray-800">{model.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {/* If no models match the search, display a fallback message */}
        {groupedModels.length === 0 && (
          <p className="text-sm text-gray-500 px-2 py-1">No models found.</p>
        )}
      </div>
    </div>
  );
}

export default ModelSelector;
