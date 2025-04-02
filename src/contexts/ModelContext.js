import React, { createContext, useContext, useState, useEffect } from 'react';
import { getRegisteredModels } from '../services/models/modelRegistry';

const ModelContext = createContext();

export function useModels() {
  return useContext(ModelContext);
}

export function ModelProvider({ children }) {
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        const registeredModels = await getRegisteredModels();
        setModels(registeredModels);
        
        // Select the first model by default if available
        if (registeredModels.length > 0) {
          setSelectedModels([registeredModels[0].id]);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load AI models. Please check your configuration.');
        console.error('Error loading models:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  const toggleModelSelection = (modelId) => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      } else {
        return [...prev, modelId];
      }
    });
  };

  const selectAllModels = () => {
    setSelectedModels(models.map(model => model.id));
  };

  const clearModelSelection = () => {
    setSelectedModels([]);
  };

  const value = {
    models,
    selectedModels,
    isLoading,
    error,
    toggleModelSelection,
    selectAllModels,
    clearModelSelection
  };

  return (
    <ModelContext.Provider value={value}>
      {children}
    </ModelContext.Provider>
  );
}
