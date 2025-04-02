import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    try {
      // Wait a bit to simulate the login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Login with the demo account
      demoLogin();
      
      // Redirect to the dashboard
      navigate('/');
    } catch (error) {
      console.error('Error during demo login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            AI Models Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Compare responses from different AI models
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Enter Demo Mode'}
            </button>
          </div>
          
          <div className="text-sm text-center">
            <p className="text-gray-500 dark:text-gray-400">
              This is a demo application. No actual API calls will be made.
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              To use real API functionality, add your API keys in the Settings page after logging in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
