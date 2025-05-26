import React from 'react';
import { Palette, Github, Twitter, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-sm border-b border-gray-200/20 dark:border-gray-700/30 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm">
              <Palette className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white font-display">
                Palette Designer
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Beautiful color palettes for developers
              </p>
            </div>
          </div>

          {/* Navigation Features */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium">
                🎨 <span className="hidden xl:inline">Generate</span>
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium">
                👁️ <span className="hidden xl:inline">Preview</span>
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium">
                📤 <span className="hidden xl:inline">Export</span>
              </span>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 lg:p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            {/* Social Links */}
            <div className="flex items-center gap-1 lg:gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 lg:p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                title="View on GitHub"
              >
                <Github size={16} className="lg:w-[18px] lg:h-[18px]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 lg:p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Follow on Twitter"
              >
                <Twitter size={16} className="lg:w-[18px] lg:h-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
