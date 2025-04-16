import React from 'react';

const ParameterControls = ({ parameters, setParameters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsedValue =
      name === 'temperature' || name === 'maxTokens'
        ? parseFloat(value)
        : value;

    setParameters((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Temperature Slider */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="temperature"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Temperature
          </label>
          <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">
            {parameters.temperature}
          </span>
        </div>
        <input
          type="range"
          id="temperature"
          name="temperature"
          min="0"
          max="1"
          step="0.1"
          value={parameters.temperature}
          onChange={handleChange}
          className="w-full h-2 appearance-none bg-gray-200 dark:bg-gray-700 rounded-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Precise</span>
          <span>Creative</span>
        </div>
      </div>

      {/* Max Tokens Slider */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="maxTokens"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Max Output Tokens
          </label>
          <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">
            {parameters.maxTokens}
          </span>
        </div>
        <input
          type="range"
          id="maxTokens"
          name="maxTokens"
          min="100"
          max="2000"
          step="100"
          value={parameters.maxTokens}
          onChange={handleChange}
          className="w-full h-2 appearance-none bg-gray-200 dark:bg-gray-700 rounded-full accent-indigo-500"
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