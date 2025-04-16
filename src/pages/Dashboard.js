import React from 'react';
import { useNavigate } from 'react-router-dom';

const dashboardData = [
  {
    id: 'openai',
    name: 'OpenAI',
    logoUrl: '/logos/openai.svg',
    modelsAvailable: 4,
    lastUsed: 'gpt-4',
    apiKeyConfigured: true,
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logoUrl: '/logos/anthropic.svg',
    modelsAvailable: 2,
    lastUsed: 'claude-3-opus',
    apiKeyConfigured: false,
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    logoUrl: '/logos/mistral.svg',
    modelsAvailable: 1,
    lastUsed: 'mistral-medium',
    apiKeyConfigured: true,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Model Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.map((provider) => (
          <div
            key={provider.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 flex flex-col justify-between space-y-4"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <img
                src={provider.logoUrl}
                alt={`${provider.name} logo`}
                className="h-8 w-8 rounded"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {provider.name}
                </h2>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    provider.apiKeyConfigured
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {provider.apiKeyConfigured ? 'API Key Set' : 'Not Configured'}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p>
                <span className="font-medium">Models:</span>{' '}
                {provider.modelsAvailable}
              </p>
              <p>
                <span className="font-medium">Last Used:</span>{' '}
                {provider.lastUsed || '—'}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('/questions')}
              className="mt-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Ask a Question →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
