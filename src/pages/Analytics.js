import React, { useState, useEffect, useCallback } from 'react';
import UsageMetrics from '../components/analytics/UsageMetrics';
import CostAnalysis from '../components/analytics/CostAnalysis';
import PerformanceCharts from '../components/analytics/PerformanceCharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month'); // 'day', 'week', 'month', 'year'
  const [usageData, setUsageData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to memoize the generateMockData function
  const generateMockData = useCallback((range) => {
    let dataPoints;
    let dateFormat;
    
    try {
      // Determine how many data points to generate based on time range
      switch (range) {
        case 'day':
          dataPoints = 24; // Hours in a day
          dateFormat = 'hour';
          break;
        case 'week':
          dataPoints = 7; // Days in a week
          dateFormat = 'day';
          break;
        case 'month':
          dataPoints = 30; // Approx. days in a month
          dateFormat = 'day';
          break;
        case 'year':
          dataPoints = 12; // Months in a year
          dateFormat = 'month';
          break;
        default:
          dataPoints = 30;
          dateFormat = 'day';
      }
      
      // Generate dates for the data points
      const dates = generateDateLabels(dataPoints, dateFormat);
      
      // Generate mock usage data
      const mockUsageData = {
        labels: dates,
        datasets: [
          {
            label: 'OpenAI GPT-4o',
            data: Array.from({ length: dataPoints }, () => Math.floor(Math.random() * 100) + 50),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Anthropic Claude 3',
            data: Array.from({ length: dataPoints }, () => Math.floor(Math.random() * 80) + 40),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          },
          {
            label: 'Google Gemini',
            data: Array.from({ length: dataPoints }, () => Math.floor(Math.random() * 60) + 30),
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
          },
        ],
        totalQueries: Math.floor(Math.random() * 5000) + 3000,
        averageTokens: Math.floor(Math.random() * 500) + 800,
      };
      
      // Generate mock cost data
      const mockCostData = {
        labels: dates,
        datasets: [
          {
            label: 'OpenAI GPT-4o',
            data: Array.from({ length: dataPoints }, () => parseFloat((Math.random() * 2 + 1).toFixed(2))),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Anthropic Claude 3',
            data: Array.from({ length: dataPoints }, () => parseFloat((Math.random() * 1.5 + 0.8).toFixed(2))),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          },
          {
            label: 'Google Gemini',
            data: Array.from({ length: dataPoints }, () => parseFloat((Math.random() * 1 + 0.5).toFixed(2))),
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
          },
        ],
        totalCost: parseFloat((Math.random() * 100 + 50).toFixed(2)),
        costProjection: parseFloat((Math.random() * 150 + 100).toFixed(2)),
      };
      
      // Generate mock performance data
      const mockPerformanceData = {
        models: ['OpenAI GPT-4o', 'Anthropic Claude 3', 'Google Gemini'],
        accuracy: [
          parseFloat((Math.random() * 2 + 8).toFixed(1)),
          parseFloat((Math.random() * 2 + 7.5).toFixed(1)),
          parseFloat((Math.random() * 2 + 7).toFixed(1)),
        ],
        relevance: [
          parseFloat((Math.random() * 2 + 8).toFixed(1)),
          parseFloat((Math.random() * 2 + 8).toFixed(1)),
          parseFloat((Math.random() * 2 + 7.5).toFixed(1)),
        ],
        clarity: [
          parseFloat((Math.random() * 1 + 8.5).toFixed(1)),
          parseFloat((Math.random() * 1 + 8).toFixed(1)),
          parseFloat((Math.random() * 1 + 7.5).toFixed(1)),
        ],
        responseTime: [
          parseFloat((Math.random() * 500 + 800).toFixed(0)),
          parseFloat((Math.random() * 400 + 900).toFixed(0)),
          parseFloat((Math.random() * 300 + 600).toFixed(0)),
        ],
      };
      
      return { mockUsageData, mockCostData, mockPerformanceData };
    } catch (error) {
      console.error("Error in generateMockData:", error);
      setError("Failed to generate analytics data. Please try again later.");
      return { 
        mockUsageData: {labels: [], datasets: [], totalQueries: 0, averageTokens: 0}, 
        mockCostData: {labels: [], datasets: [], totalCost: 0, costProjection: 0}, 
        mockPerformanceData: {models: [], accuracy: [], relevance: [], clarity: [], responseTime: []} 
      };
    }
  }, []);
  
  const generateDateLabels = (count, format) => {
    try {
      const labels = [];
      const today = new Date();
      
      for (let i = count - 1; i >= 0; i--) {
        const date = new Date();
        
        switch (format) {
          case 'hour':
            date.setHours(today.getHours() - i);
            labels.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            break;
          case 'day':
            date.setDate(today.getDate() - i);
            labels.push(date.toLocaleDateString([], { month: 'short', day: 'numeric' }));
            break;
          case 'month':
            date.setMonth(today.getMonth() - i);
            labels.push(date.toLocaleDateString([], { month: 'short' }));
            break;
          default:
            date.setDate(today.getDate() - i);
            labels.push(date.toLocaleDateString());
        }
      }
      
      return labels;
    } catch (error) {
      console.error("Error in generateDateLabels:", error);
      return Array(30).fill("Error");
    }
  };

  useEffect(() => {
    console.log("Analytics component mounted or timeRange changed:", timeRange);
    // In a real application, this would fetch data from your backend
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        console.log("Generating mock data...");
        // Generate mock data based on the selected time range
        const { mockUsageData, mockCostData, mockPerformanceData } = generateMockData(timeRange);
        
        console.log("Setting data states...");
        setUsageData(mockUsageData);
        setCostData(mockCostData);
        setPerformanceData(mockPerformanceData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange, generateMockData]);

  if (error) {
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Analytics Dashboard
        </h1>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Analytics Dashboard
      </h1>
      
      <div className="mb-6 flex justify-end">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeRange === 'day'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeRange('day')}
          >
            Day
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeRange === 'year'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {usageData && usageData.datasets && (
            <UsageMetrics data={usageData} timeRange={timeRange} />
          )}
          {costData && costData.datasets && (
            <CostAnalysis data={costData} timeRange={timeRange} />
          )}
          {performanceData && performanceData.models && (
            <PerformanceCharts data={performanceData} />
          )}
        </div>
      )}
    </div>
  );
};

export default Analytics;
