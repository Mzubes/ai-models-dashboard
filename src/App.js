// ✅ App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

import { ModelProvider } from './contexts/ModelContext';

const App = () => {
  return (
    <ModelProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
          <Sidebar />
          <main className="flex-1 ml-0 sm:ml-64 p-6 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<div className="text-red-500">Page not found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ModelProvider>
  );
};

export default App;
