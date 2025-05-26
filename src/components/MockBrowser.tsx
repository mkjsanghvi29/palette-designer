import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import type { Palette } from '../types/color';

interface MockBrowserProps {
  palette: Palette;
  device?: 'desktop' | 'tablet' | 'mobile';
}

export const MockBrowser: React.FC<MockBrowserProps> = ({ palette, device = 'desktop' }) => {
  const primary = palette.colors.find(c => c.role === 'primary')?.hex || '#3b82f6';
  const secondary = palette.colors.find(c => c.role === 'secondary')?.hex || '#64748b';
  const accent = palette.colors.find(c => c.role === 'accent')?.hex || '#f59e0b';
  const surface = palette.colors.find(c => c.role === 'surface')?.hex || '#ffffff';
  const text = palette.colors.find(c => c.role === 'text')?.hex || '#1f2937';

  const deviceDimensions = {
    desktop: { width: 'w-full max-w-4xl', height: 'h-96', icon: Monitor },
    tablet: { width: 'w-80', height: 'h-96', icon: Tablet },
    mobile: { width: 'w-64', height: 'h-96', icon: Smartphone },
  };

  const currentDevice = deviceDimensions[device];
  const DeviceIcon = currentDevice.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Device Type Indicator */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <DeviceIcon size={16} />
        <span className="capitalize">{device} Preview</span>
      </div>

      {/* Browser Window */}
      <div className={`${currentDevice.width} mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden`}>
        {/* Browser Chrome */}
        <div className="bg-gray-200 dark:bg-gray-700 px-4 py-3 flex items-center gap-3">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          {/* Address Bar */}
          <div className="flex-1 bg-white dark:bg-gray-600 rounded px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
            https://yoursite.com
          </div>
        </div>

        {/* Website Content */}
        <div 
          className={`${currentDevice.height} overflow-hidden`}
          style={{ backgroundColor: surface }}
        >
          {/* Header */}
          <div 
            className="h-16 flex items-center justify-between px-6"
            style={{ backgroundColor: primary }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-8 h-8 rounded"
                style={{ backgroundColor: surface }}
              ></div>
              <div 
                className="text-lg font-semibold"
                style={{ color: surface }}
              >
                Your Brand
              </div>
            </div>
            <div className="flex gap-4">
              {['Home', 'About', 'Contact'].map((item) => (
                <div 
                  key={item}
                  className="text-sm"
                  style={{ color: surface }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <div className="px-6 py-8">
            <div 
              className="text-3xl font-bold mb-4"
              style={{ color: text }}
            >
              Welcome to Your Site
            </div>
            <div 
              className="text-lg mb-6 opacity-80"
              style={{ color: text }}
            >
              Experience the power of great design with this beautiful color palette
            </div>
            <div className="flex gap-4">
              <button 
                className="px-6 py-3 rounded-lg font-medium text-white"
                style={{ backgroundColor: primary }}
              >
                Get Started
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-medium border-2"
                style={{ 
                  color: secondary,
                  borderColor: secondary 
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Content Cards */}
          <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="p-4 rounded-lg shadow-sm border"
                style={{ 
                  backgroundColor: i === 2 ? accent : surface,
                  borderColor: secondary + '30',
                  color: i === 2 ? surface : text
                }}
              >
                <div className="w-full h-24 rounded mb-3" style={{ 
                  backgroundColor: i === 2 ? surface + '30' : secondary + '20' 
                }}></div>
                <div className="font-medium mb-2">Feature {i}</div>
                <div className="text-sm opacity-75">
                  Description of this amazing feature
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div 
            className="mt-8 h-16 flex items-center justify-center"
            style={{ backgroundColor: secondary }}
          >
            <div 
              className="text-sm"
              style={{ color: surface }}
            >
              © 2025 Your Brand. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
