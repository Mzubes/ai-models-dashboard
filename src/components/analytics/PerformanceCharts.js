import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PerformanceCharts = ({ data }) => {
  if (!data || !data.models) {
    return <div>No performance data available</div>;
  }

  // Create radar chart data
  const radarChartData = {
    labels: ['Accuracy', 'Relevance', 'Clarity', 'Response Time'],
    datasets: data.models.map((model, index) => {
      let color;
      switch(index) {
        case 0:
          color = 'rgba(75, 192, 192, 1)';
          break;
        case 1:
          color = 'rgba(153, 102, 255, 1)';
          break;
        case 2:
          color = 'rgba(255, 159, 64, 1)';
          break;
        default:
          color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
      }
      
      // Normalize response time to 0-10 scale (lower is better)
      // Assuming max response time is 2000ms and min is 0ms
      const normalizedResponseTime = 10 - (data.responseTime[index] / 2000 * 10);
      
      return {
        label: model,
        data: [
          data.accuracy[index],
          data.relevance[index],
          data.clarity[index],
          normalizedResponseTime.toFixed(1), // Lower is better, so we invert
        ],
        backgroundColor: color.replace('1)', '0.2)'),
        borderColor: color,
        borderWidth: 2,
      };
    }),
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 10
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Performance Comparison
        </h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
              Model Quality Metrics
            </h3>
            <div className="w-full max-w-2xl h-80">
              <Radar data={radarChartData} options={chartOptions} />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Detailed Performance Metrics
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Accuracy (1-10)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Relevance (1-10)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Clarity (1-10)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Avg. Response Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {data.models.map((model, index) => (
                  <tr key={model}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {data.accuracy[index]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {data.relevance[index]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {data.clarity[index]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {data.responseTime[index]}ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;
