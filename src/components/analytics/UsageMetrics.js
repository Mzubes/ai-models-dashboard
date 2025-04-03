import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UsageMetrics = ({ data, timeRange }) => {
  if (!data || !data.datasets) {
    return <div>No usage data available</div>;
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Query Volume by Model (${timeRange})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Queries',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Usage Metrics
        </h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Total Queries
            </h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.totalQueries?.toLocaleString() || 0}
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Average Tokens / Query
            </h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.averageTokens?.toLocaleString() || 0}
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Most Used Model
            </h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.datasets && data.datasets.length > 0 ? data.datasets[0].label : 'N/A'}
            </div>
          </div>
        </div>
        
        <div className="w-full h-80">
          <Line options={chartOptions} data={data} />
        </div>
      </div>
    </div>
  );
};

export default UsageMetrics;
