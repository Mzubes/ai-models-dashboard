export const fetchPerplexityModels = async (apiKey) => {
  if (!apiKey) {
    throw new Error('Perplexity API key is required');
  }

  return [
    { id: 'pplx-70b-online', name: 'Perplexity 70B Online', description: 'Most powerful model with real-time information access', maxTokens: 4096 },
    { id: 'pplx-7b-online', name: 'Perplexity 7B Online', description: 'Efficient model with real-time information access', maxTokens: 4096 },
    { id: 'pplx-70b-chat', name: 'Perplexity 70B Chat', description: 'Powerful conversational model', maxTokens: 4096 },
    { id: 'pplx-7b-chat', name: 'Perplexity 7B Chat', description: 'Efficient conversational model', maxTokens: 4096 },
    { id: 'sonar-small-online', name: 'Sonar Small Online', description: 'Fast model with real-time information', maxTokens: 4096 },
    { id: 'sonar-medium-online', name: 'Sonar Medium Online', description: 'Balanced model with real-time information', maxTokens: 4096 }
  ];
};

export const sendPerplexityQuery = async (apiKey, modelId, prompt, parameters) => {
  if (!apiKey) {
    throw new Error('Perplexity API key is required');
  }

  // For demo purposes, simulate a response
  return {
    id: `perplexity-${Date.now()}`,
    model: modelId,
    content: `This is a simulated response from Perplexity's ${modelId} for the prompt: "${prompt}"`,
    usage: {
      prompt_tokens: prompt.length / 4,
      completion_tokens: 140,
      total_tokens: prompt.length / 4 + 140,
    },
    metadata: {
      latency: 880, // ms
      provider: 'perplexity',
    },
    timestamp: new Date().toISOString()
  };
};
