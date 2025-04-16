import React, { useState } from 'react';
import QuestionInput from '../components/questions/QuestionInput';
import ModelSelector from '../components/questions/ModelSelector';
import ResponseCard from '../components/questions/ResponseCard';
import ParameterControls from '../components/questions/ParameterControls';
import { useModels } from '../contexts/ModelContext';
import { sendQuery, saveToHistory } from '../services/api';

const Questions = () => {
  const { models = [], selectedModels = [] } = useModels() || {}; // safe destructure
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, setParameters] = useState({
    temperature: 0.7,
    maxTokens: 500,
  });

  const handlePromptChange = (value) => {
    setPrompt(value);
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || selectedModels.length === 0) return;

    setIsLoading(true);
    setResponses([]);

    try {
      const queryPromises = selectedModels.map((modelId) => {
        const model = models.find((m) => m.id === modelId);
        if (!model) throw new Error(`Model with ID ${modelId} not found`);
        return sendQuery(model.provider, modelId, prompt, parameters);
      });

      const results = await Promise.all(queryPromises);
      setResponses(results);

      saveToHistory(prompt, results);
    } catch (error) {
      console.error('Error sending queries:', error);
      alert('There was an error sending your query. Check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Ask Questions</h1>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Model Selector */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Select Models</h2>
            <ModelSelector />
          </div>
        </div>

        {/* Parameter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Parameters</h2>
            <ParameterControls parameters={parameters} setParameters={setParameters} />
          </div>
        </div>

        {/* Question Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Question</h2>
            <QuestionInput
              value={prompt}
              onChange={handlePromptChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Responses Section */}
      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Responses</h2>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : responses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responses.map((response, index) => (
              <ResponseCard
                key={response.id || index}
                response={response}
                prompt={prompt}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No responses yet. Select models and ask a question to see results.
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
