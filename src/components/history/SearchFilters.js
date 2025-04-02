// src/components/history/SearchFilters.js
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useModels } from '../../contexts/ModelContext';

const SearchFilters = ({
  onSearch,
  onDateRangeChange,
  onModelSelect,
  initialSearchTerm = '',
  initialDateRange = { start: null, end: null },
  initialSelectedModels = []
}) => {
  const { models } = useModels();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [startDate, setStartDate] = useState(initialDateRange.start || '');
  const [endDate, setEndDate] = useState(initialDateRange.end || '');
  const [selectedModels, setSelectedModels] = useState(initialSelectedModels);

  // Initialize with passed values
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
    setStartDate(initialDateRange.start || '');
    setEndDate(initialDateRange.end || '');
    setSelectedModels(initialSelectedModels);
  }, [initialSearchTerm, initialDateRange, initialSelectedModels]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    onDateRangeChange({
      start: e.target.value || null,
      end: endDate || null
    });
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    onDateRangeChange({
      start: startDate || null,
      end: e.target.value || null
    });
  };

  const handleModelChange = (e, modelId) => {
    const isChecked = e.target.checked;
    
    let updatedModels;
    if (isChecked) {
      updatedModels = [...selectedModels, modelId];
    } else {
      updatedModels = selectedModels.filter(id => id !== modelId);
    }
    
    setSelectedModels(updatedModels);
    onModelSelect(updatedModels);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setSelectedModels([]);
    
    onSearch('');
    onDateRangeChange({ start: null, end: null });
    onModelSelect([]);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Search in queries and responses..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Models
        </label>
        <div className="max-h-40 overflow-y-auto space-y-2 p-2 border border-gray-200 rounded-md dark:border-gray-700">
          {models.map(model => (
            <div key={model.id} className="flex items-center">
              <input
                id={`model-${model.id}`}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={selectedModels.includes(model.id)}
                onChange={(e) => handleModelChange(e, model.id)}
              />
              <label
                htmlFor={`model-${model.id}`}
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                {model.name}
              </label>
            </div>
          ))}
          
          {models.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              No models available
            </div>
          )}
        </div>
      </div>
      
      <button
        className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={clearFilters}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default SearchFilters;
