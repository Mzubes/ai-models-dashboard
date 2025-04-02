import React, { useState, useEffect } from 'react';
import { useModels } from '../contexts/ModelContext';
import { useNavigate, useLocation } from 'react-router-dom';
import DiffHighlighter from '../components/comparison/DiffHighlighter';
import EvaluationTools from '../components/comparison/EvaluationTools';
import { sendQuery } from '../services/api';

const Comparison = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { models, selectedModels } = useModels();
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedView, setSelectedView] = useState('side-by-side'); // 'side-by-side' or 'diff'
  const [ratings, setRatings] = useState({});

  // Load comparison data from location state if available (redirected from Questions page)
  useEffect(() => {
    if (location.state?.prompt && location.state?.responses) {
      setPrompt(location.state.prompt);
      setResponses(location.state.responses);
      
      // Initialize ratings for each response
      const initialRatings = {};
      location.state.responses.forEach(response => {
        initialRatings[response.id] = {
          accuracy: 0,
          relevance: 0,
          clarity: 0,
          overall: 0,
        };
      });
      setRatings(initialRatings);
    }
  }, [location.state]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || selectedModels.length < 2) {
      alert('Please enter a prompt and select at least two models to compare');
      return;
    }

    setIsLoading(true);
    setResponses([]);

    try {
      const queryPromises = selectedModels.map(modelId => {
        const model = models.find(m => m.id === modelId);
        return sendQuery(model.provider, modelId, prompt, {
          temperature: 0.7,
          maxTokens: 500,
        });
      });

      const results = await Promise.all(queryPromises);
      setResponses(results);
      
      // Initialize ratings for each response
      const initialRatings = {};
      results.forEach(response => {
        initialRatings[response.id] = {
          accuracy: 0,
          relevance: 0,
          clarity: 0,
          overall: 0,
        };
      });
      setRatings(initialRatings);
    } catch (error) {
      console.error('Error sending comparison queries:', error);
      // Handle error (show notification, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingChange = (responseId, category, value) => {
    setRatings(prev => ({
      ...prev,
      [responseId]: {
        ...prev[responseId],
        [category]: value
      }
    }));
  };

  const saveComparison = () => {
    // In a real app, this would save to a database
    const comparisonData = {
      id: `comparison-${Date.now()}`,
      prompt,
      responses,
      ratings,
      timestamp: new Date().toISOString(),
    };
    
    // For this demo, we'll save to localStorage
    const savedComparisons = JSON.parse(localStorage.getItem('savedComparisons') || '[]');
    savedComparisons.push(comparisonData);
    localStorage.setItem('savedComparisons', JSON.stringify(savedComparisons));
    
    alert('Comparison saved!');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Model Comparison
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
            Enter a prompt to compare models
          </h2>
          
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="4"
              placeholder="Enter your prompt for comparison..."
              value={prompt}
              onChange={handlePromptChange}
              disabled={isLoading}
            ></textarea>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Select at least two models for comparison on the Questions page
              </div>
              
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim() || selectedModels.length < 2}
              >
                {isLoading ? 'Comparing...' : 'Compare Models'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {responses.length > 0 && (
        <>
          <div className="mb-6 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                className={`px-3 py-1 rounded-md ${
                  selectedView === 'side-by-side'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setSelectedView('side-by-side')}
              >
                Side by Side
              </button>
              <button
                className={`px-3 py-1 rounded-md ${
                  selectedView === 'diff'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setSelectedView('diff')}
              >
                Diff View
              </button>
            </div>
            
            <button
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={saveComparison}
            >
              Save Comparison
            </button>
          </div>
          
          {selectedView === 'side-by-side' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {responses.map(response => (
                <div key={response.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {response.model}
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {response.content}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Evaluate Response
                    </h4>
                    <EvaluationTools
                      responseId={response.id}
                      ratings={ratings[response.id]}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Difference Comparison
                </h3>
              </div>
              
              <div className="p-4">
                {responses.length >= 2 && (
                  <DiffHighlighter
                    responses={responses}
                    prompt={prompt}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
      
      {responses.length === 0 && !isLoading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Enter a prompt and select models to see comparison results.
          </p>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default Comparison;
