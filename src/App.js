// ✅ App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
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


// ✅ Sidebar.js (place in /src/components/Sidebar.js)
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Ask Questions', to: '/questions' },
  { label: 'History', to: '/history' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Settings', to: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-full sm:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen fixed top-0 left-0 z-10">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
          🧠 AI Models Hub
        </h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;


// ✅ Placeholder Dashboard.js (place in /src/pages/Dashboard.js)
import React from 'react';

const Dashboard = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p>This is your model overview dashboard.</p>
    </div>
  );
};

export default Dashboard;


// ✅ Placeholder Questions.js (place in /src/pages/Questions.js)
import React from 'react';

const Questions = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">Ask Questions</h1>
      <p>This is where users will select models and submit prompts.</p>
    </div>
  );
};

export default Questions;


// ✅ Placeholder History.js (place in /src/pages/History.js)
import React from 'react';

const History = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">Query History</h1>
      <p>This will display a log of past queries and model responses.</p>
    </div>
  );
};

export default History;


// ✅ Placeholder Analytics.js (place in /src/pages/Analytics.js)
import React from 'react';

const Analytics = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">Analytics</h1>
      <p>Charts and model performance metrics will go here.</p>
    </div>
  );
};

export default Analytics;


// ✅ Placeholder Settings.js (place in /src/pages/Settings.js)
import React from 'react';

const Settings = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <p>API key management and user preferences go here.</p>
    </div>
  );
};

export default Settings;
