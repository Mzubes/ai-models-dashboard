import React from 'react';

const ParameterControls = ({ parameters, setParameters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert string inputs to numbers for numeric parameters
    const parsedValue = name === 'temperature' || name === 'maxTokens' 
      ? parseFloat(value) 
      : value;
    
    setParameters(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Temperature: {parameters.temperature}
        </label>
        <input
          type="range"
          id="temperature"
          name="temperature"
          min="0"
          max="1"
          step="0.1"
          value={parameters.temperature}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Precise (0)</span>
          <span>Creative (1)</span>
        </div>
      </div>
      
      <div>
        <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Max Output Tokens: {parameters.maxTokens}
        </label>
        <input
          type="range"
          id="maxTokens"
          name="maxTokens"
          min="100"
          max="2000"
          step="100"
          value={parameters.maxTokens}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Short</span>
          <span>Long</span>
        </div>
      </div>
    </div>
  );
};

export default ParameterControls;
