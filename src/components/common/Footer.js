import React from 'react';

const Footer = () => {
  return (
    <footer className="py-3 px-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} AI Models Dashboard
        </p>
        <div className="flex space-x-4">
          <a 
            href="https://github.com/yourusername/ai-models-dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            GitHub
          </a>
          <a 
            href="#" 
            className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
