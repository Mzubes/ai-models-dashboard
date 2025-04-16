import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import History from './pages/History'; // Optional, if you have this
import { ModelProvider } from './contexts/ModelContext';

import './index.css'; // Make sure Tailwind is configured

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
              <Route path="/history" element={<History />} /> {/* Optional */}
            </Routes>
          </main>
        </div>
      </Router>
    </ModelProvider>
  );
};

export default App;
