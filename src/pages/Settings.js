// src/pages/Settings.js - Fixed version
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getModelProviders } from '../services/models/modelRegistry';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [providers, setProviders] = useState([]);
  const [apiKeys, setApiKeys] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Get all model providers
    const modelProviders = getModelProviders();
    setProviders(modelProviders);
    
    // Load saved API keys from localStorage
    const keys = {};
    modelProviders.forEach(provider => {
      const key = localStorage.getItem(`${provider.id}_api_key`);
      keys[provider.id] = key || '';
    });
    
    setApiKeys(keys);
  }, []);

  const handleApiKeyChange = (providerId, value) => {
    setApiKeys(prev => ({
      ...prev,
      [providerId]: value
    }));
  };

  const saveApiKey = (providerId) => {
    setIsSaving(true);
    
    try {
      localStorage.setItem(`${providerId}_api_key`, apiKeys[providerId]);
      
      setSuccessMessage(`API key for ${providerId} saved successfully.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving API key:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const clearApiKey = (providerId) => {
    // Using window.confirm instead of direct confirm call
    if (window.confirm(`Are you sure you want to remove the API key for ${providerId}?`)) {
      localStorage.removeItem(`${providerId}_api_key`);
      
      setApiKeys(prev => ({
        ...prev,
        [providerId]: ''
      }));
      
      setSuccessMessage(`API key for ${providerId} removed.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const clearAllData = () => {
    // Using window.confirm instead of direct confirm call
    if (window.confirm('Are you sure you want to clear all application data? This will remove all your history, categories, and settings.')) {
      localStorage.clear();
      setSuccessMessage('All application data has been cleared. The page will reload.');
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Settings</h1>
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg dark:bg-green-800 dark:text-green-100">
          {successMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">API Keys</h2>
          
          <div className="space-y-6">
            {providers.map(provider => (
              <div key={provider.id} className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  {provider.name} API Key
                </label>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={apiKeys[provider.id] || ''}
                    onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                    placeholder={`Enter your ${provider.name} API key`}
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    onClick={() => saveApiKey(provider.id)}
                    disabled={isSaving || !apiKeys[provider.id]}
                  >
                    Save
                  </button>
                  {apiKeys[provider.id] && (
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => clearApiKey(provider.id)}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {provider.apiKeyRequired 
                    ? `Required to use ${provider.name} models` 
                    : `Optional for ${provider.name} models`}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Data Management</h2>
          
          <div className="space-y-4">
            <button
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={clearAllData}
            >
              Clear All Application Data
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This will remove all your history, categories, saved comparisons, and settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
