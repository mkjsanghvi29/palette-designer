import React from 'react';
import { Palette, Github, Twitter, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">UI Palette Designer</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Professional color palettes for developers
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">
                🎨 Generate
              </span>
              <span className="flex items-center gap-1">
                📤 Export
              </span>
              <span className="flex items-center gap-1">
                ❤️ Save
              </span>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title="View on GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title="Share on Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
