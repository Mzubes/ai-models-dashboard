import React, { useState, useEffect } from 'react';

const ModelSelector = ({ models, selectedModels, setSelectedModels }) => {
  const [search, setSearch] = useState('');
  const [filteredModels, setFilteredModels] = useState(models);

  useEffect(() => {
    setFilteredModels(
      models.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, models]);

  const toggleSelect = (modelId) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter(id => id !== modelId));
    } else {
      setSelectedModels([...selectedModels, modelId]);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-4 text-white">
      <input
        type="text"
        placeholder="Search models..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-3 rounded-md bg-gray-700 border border-gray-600"
      />

      <div className="max-h-72 overflow-auto space-y-2">
        {filteredModels.map(model => (
          <div
            key={model.id}
            className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer ${
              selectedModels.includes(model.id)
                ? 'border-blue-400 bg-gray-700'
                : 'border-gray-600'
            } ${!model.isAvailable ? 'opacity-50' : ''}`}
            onClick={() => model.isAvailable && toggleSelect(model.id)}
          >
            <div className="flex items-center gap-2">
              <img src={model.logoUrl} alt="logo" className="h-6 w-6 rounded-md" />
              <span>{model.name}</span>
            </div>
            {!model.isAvailable && (
              <span className="text-xs text-red-400">Not Configured</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
