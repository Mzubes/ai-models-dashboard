import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Import all page components
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import Comparison from './pages/Comparison';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';

// Import common layout components
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';

// Component to protect routes and redirect if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // Redirect unauthenticated users to Login
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar visible only for authenticated users */}
      {isAuthenticated && <Sidebar />}

      {/* Main content area (full height & width if no sidebar) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header visible only for authenticated users */}
        {isAuthenticated && <Header />}

        {/* Main section for page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            {/* Public route: Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes: wrap each in ProtectedRoute */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/questions" 
              element={
                <ProtectedRoute>
                  <Questions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/comparison" 
              element={
                <ProtectedRoute>
                  <Comparison />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all: redirect any unknown routes to the Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer visible only for authenticated users */}
        {isAuthenticated && <Footer />}
      </div>
    </div>
  );
}

export default App;