import { fetchOpenAIModels } from './openai';
import { fetchAnthropicModels } from './anthropic';
import { fetchGoogleModels } from './google';
import { fetchMistralModels } from './mistral';
import { fetchMetaModels } from './meta';
import { fetchPerplexityModels } from './perplexity';

// Model registry - centralized place to manage AI model connections
const modelProviders = [
  { 
    id: 'openai', 
    name: 'OpenAI', 
    fetchModels: fetchOpenAIModels,
    logoUrl: '/logos/openai.svg',
    apiKeyRequired: true,
  },
  { 
    id: 'anthropic', 
    name: 'Anthropic', 
    fetchModels: fetchAnthropicModels,
    logoUrl: '/logos/anthropic.svg',
    apiKeyRequired: true,
  },
  { 
    id: 'google', 
    name: 'Google AI', 
    fetchModels: fetchGoogleModels,
    logoUrl: '/logos/google.svg',
    apiKeyRequired: true,
  },
  { 
    id: 'meta', 
    name: 'Meta AI', 
    fetchModels: fetchMetaModels,
    logoUrl: '/logos/meta.svg',
    apiKeyRequired: true,
  },
  { 
    id: 'mistral', 
    name: 'Mistral AI', 
    fetchModels: fetchMistralModels,
    logoUrl: '/logos/mistral.svg',
    apiKeyRequired: true,
  },
  { 
    id: 'perplexity', 
    name: 'Perplexity AI', 
    fetchModels: fetchPerplexityModels,
    logoUrl: '/logos/perplexity.svg',
    apiKeyRequired: true,
  },
];

// Get all configured model providers
export const getModelProviders = () => {
  return modelProviders;
};

// Get all available models from all providers
export const getRegisteredModels = async () => {
  try {
    const allModels = [];
    
    for (const provider of modelProviders) {
      try {
        // Check if API keys are configured for this provider
        const apiKey = localStorage.getItem(`${provider.id}_api_key`);
        if (!apiKey && provider.apiKeyRequired) {
          allModels.push({
            id: `${provider.id}_unconfigured`,
            name: `${provider.name} (Not Configured)`,
            provider: provider.id,
            isAvailable: false,
            requiresSetup: true,
          });
          continue;
        }
        
        // Fetch models from this provider
        const models = await provider.fetchModels(apiKey);
        
        models.forEach(model => {
          allModels.push({
            ...model,
            provider: provider.id,
            isAvailable: true,
          });
        });
      } catch (error) {
        console.error(`Error fetching models from ${provider.name}:`, error);
        allModels.push({
          id: `${provider.id}_error`,
          name: `${provider.name} (Connection Error)`,
          provider: provider.id,
          isAvailable: false,
          error: error.message,
        });
      }
    }
    
    return allModels;
  } catch (error) {
    console.error('Error in getRegisteredModels:', error);
    throw error;
  }
};
