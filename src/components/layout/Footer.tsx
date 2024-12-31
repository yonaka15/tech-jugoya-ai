import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto py-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <a 
              href="https://jugoya.ai" 
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              jugoya.ai
            </a>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              © {currentYear} jugoya.ai All rights reserved.
            </p>
            <p className="mt-2 text-xs">
              Content licensed under{' '}
              <a 
                href="https://creativecommons.org/licenses/by-nc-nd/4.0/" 
                className="underline hover:text-gray-700 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY-NC-ND 4.0
              </a>
              {' '}| Source code licensed under{' '}
              <a 
                href="https://opensource.org/licenses/Apache-2.0" 
                className="underline hover:text-gray-700 dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apache License 2.0
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
