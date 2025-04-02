import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryList from '../components/history/HistoryList';
import SearchFilters from '../components/history/SearchFilters';
import CategoryManager from '../components/history/CategoryManager';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedModels, setSelectedModels] = useState([]);

  // Load history and categories from localStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate delay for loading data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Load history from localStorage
        const storedHistory = JSON.parse(localStorage.getItem('queryHistory') || '[]');
        
        // Sort by timestamp (newest first)
        storedHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setHistory(storedHistory);
        setFilteredHistory(storedHistory);
        
        // Load categories from localStorage
        const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
        setCategories(storedCategories);
      } catch (error) {
        console.error('Error loading history data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Apply filters when any filter criteria changes
  useEffect(() => {
    let filtered = [...history];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.prompt.toLowerCase().includes(lowerCaseTerm) ||
          (item.responses && item.responses.some(r => 
            r.content.toLowerCase().includes(lowerCaseTerm)
          ))
      );
    }
    
    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(item => new Date(item.timestamp) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(item => new Date(item.timestamp) <= new Date(dateRange.end));
    }
    
    // Filter by selected models
    if (selectedModels.length > 0) {
      filtered = filtered.filter(item => 
        item.responses && item.responses.some(r => selectedModels.includes(r.model))
      );
    }
    
    setFilteredHistory(filtered);
  }, [history, selectedCategory, searchTerm, dateRange, selectedModels]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleModelSelect = (models) => {
    setSelectedModels(models);
  };

  const handleCreateCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    // Update history items that had this category
    const updatedHistory = history.map(item => {
      if (item.category === categoryToDelete) {
        return { ...item, category: null };
      }
      return item;
    });
    
    setHistory(updatedHistory);
    localStorage.setItem('queryHistory', JSON.stringify(updatedHistory));
    
    // Reset selected category if it was deleted
    if (selectedCategory === categoryToDelete) {
      setSelectedCategory('all');
    }
  };

  const handleAssignCategory = (historyId, category) => {
    const updatedHistory = history.map(item => {
      if (item.id === historyId) {
        return { ...item, category };
      }
      return item;
    });
    
    setHistory(updatedHistory);
    localStorage.setItem('queryHistory', JSON.stringify(updatedHistory));
  };

  const handleDeleteHistoryItem = (historyId) => {
    const updatedHistory = history.filter(item => item.id !== historyId);
    setHistory(updatedHistory);
    localStorage.setItem('queryHistory', JSON.stringify(updatedHistory));
  };

  const handleViewInComparison = (historyItem) => {
    navigate('/comparison', { state: { 
      prompt: historyItem.prompt, 
      responses: historyItem.responses 
    }});
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        History & Categories
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Categories
              </h2>
            </div>
            <div className="p-4">
              <CategoryManager
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
                onCreateCategory={handleCreateCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Filters
              </h2>
            </div>
            <div className="p-4">
              <SearchFilters
                onSearch={handleSearch}
                onDateRangeChange={handleDateRangeChange}
                onModelSelect={handleModelSelect}
                initialSearchTerm={searchTerm}
                initialDateRange={dateRange}
                initialSelectedModels={selectedModels}
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                Query History
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredHistory.length} {filteredHistory.length === 1 ? 'entry' : 'entries'}
              </div>
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="flex justify-center items-center p-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <HistoryList
                  historyItems={filteredHistory}
                  categories={categories}
                  onAssignCategory={handleAssignCategory}
                  onDeleteItem={handleDeleteHistoryItem}
                  onViewInComparison={handleViewInComparison}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
