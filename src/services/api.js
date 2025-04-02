import { sendOpenAIQuery } from './models/openai';
import { sendAnthropicQuery } from './models/anthropic';
import { sendGoogleQuery } from './models/google';

// Central API request handler
export const sendQuery = async (providerType, modelId, prompt, parameters) => {
  try {
    // Get API key from localStorage (in a production app, this would be more secure)
    const apiKey = localStorage.getItem(`${providerType}_api_key`);
    
    if (!apiKey) {
      throw new Error(`No API key found for ${providerType}. Please add it in the settings.`);
    }
    
    // Route to the appropriate service based on provider type
    switch (providerType) {
      case 'openai':
        return await sendOpenAIQuery(apiKey, modelId, prompt, parameters);
      case 'anthropic':
        return await sendAnthropicQuery(apiKey, modelId, prompt, parameters);
      case 'google':
        return await sendGoogleQuery(apiKey, modelId, prompt, parameters);
      default:
        throw new Error(`Unsupported provider type: ${providerType}`);
    }
  } catch (error) {
    console.error(`Error in API service for ${providerType}:`, error);
    // Return error in standardized format
    return {
      id: `error-${Date.now()}`,
      model: modelId,
      content: `Error: ${error.message}`,
      error: true,
      provider: providerType,
      timestamp: new Date().toISOString()
    };
  }
};

// Function to save query and response to history
export const saveToHistory = (prompt, responses) => {
  try {
    const historyItem = {
      id: `query-${Date.now()}`,
      prompt,
      responses,
      timestamp: new Date().toISOString(),
      category: null // No category assigned initially
    };
    
    // Get existing history or initialize empty array
    const history = JSON.parse(localStorage.getItem('queryHistory') || '[]');
    
    // Add new item to the beginning
    history.unshift(historyItem);
    
    // Limit history size (optional)
    const MAX_HISTORY_ITEMS = 100;
    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(MAX_HISTORY_ITEMS);
    }
    
    // Save updated history
    localStorage.setItem('queryHistory', JSON.stringify(history));
    
    return historyItem;
  } catch (error) {
    console.error('Error saving to history:', error);
    return null;
  }
};
