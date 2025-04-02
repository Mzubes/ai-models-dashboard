// src/components/analytics/CostAnalysis.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CostAnalysis = ({ data, timeRange }) => {
  if (!data || !data.datasets) {
    return <div>No cost data available</div>;
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Cost by Model (${timeRange})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (USD)',
        },
      },
    },
  };

  // Create a stacked bar chart data
  const stackedData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      stack: 'Stack 0', // This makes the bars stack
    })),
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Cost Analysis
        </h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Total Cost
            </h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${data.totalCost?.toFixed(2) || '0.00'}
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Projected Monthly Cost
            </h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${data.costProjection?.toFixed(2) || '0.00'}
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Most Cost-Effective Model
            </h3>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.datasets && data.datasets.length > 0 ? data.datasets[2].label : 'N/A'}
            </div>
          </div>
        </div>
        
        <div className="w-full h-80">
          <Bar options={chartOptions} data={stackedData} />
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;
