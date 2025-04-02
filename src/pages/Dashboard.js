import React, { useState, useEffect } from 'react';
import { useModels } from '../contexts/ModelContext';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon, 
  ArrowsRightLeftIcon, 
  ClockIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { models, isLoading, error } = useModels();
  const [recentHistory, setRecentHistory] = useState([]);
  
  useEffect(() => {
    // Load recent history
    const history = JSON.parse(localStorage.getItem('queryHistory') || '[]');
    setRecentHistory(history.slice(0, 5)); // Get the 5 most recent items
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, link }) => (
    <Link 
      to={link} 
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to the AI Models Dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Available Models" 
          value={isLoading ? "Loading..." : error ? "Error" : models.length} 
          icon={ChatBubbleLeftRightIcon} 
          color="bg-blue-500" 
          link="/questions"
        />
        <StatCard 
          title="Comparisons" 
          value={localStorage.getItem('savedComparisons') ? JSON.parse(localStorage.getItem('savedComparisons')).length : 0} 
          icon={ArrowsRightLeftIcon} 
          color="bg-purple-500" 
          link="/comparison"
        />
        <StatCard 
          title="Query History" 
          value={localStorage.getItem('queryHistory') ? JSON.parse(localStorage.getItem('queryHistory')).length : 0} 
          icon={ClockIcon} 
          color="bg-green-500" 
          link="/history"
        />
        <StatCard 
          title="Total Queries" 
          value="--" 
          icon={ChartBarIcon} 
          color="bg-yellow-500" 
          link="/analytics"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Available Models</h2>
            <Link to="/questions" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400 py-4">{error}</div>
          ) : (
            <div className="space-y-3">
              {models.slice(0, 6).map((model) => (
                <div key={model.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{model.name}</div>
                      {model.description && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">{model.description}</div>
                      )}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${model.isAvailable ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                      {model.isAvailable ? 'Available' : 'Unavailable'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Recent Queries</h2>
            <Link to="/history" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </Link>
          </div>
          
          {recentHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No queries yet. Start by asking a question!
            </div>
          ) : (
            <div className="space-y-3">
              {recentHistory.map((item) => (
                <div key={item.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 line-clamp-2">
                    {item.prompt}
                  </div>
                  {item.responses && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {item.responses.length} {item.responses.length === 1 ? 'response' : 'responses'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
