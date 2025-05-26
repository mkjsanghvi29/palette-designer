import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Star, Heart, ShoppingCart, User, Search, Menu } from 'lucide-react';
import type { Palette } from '../types/color';

interface MockBrowserProps {
  palette: Palette;
  device?: 'desktop' | 'tablet' | 'mobile';
  template?: 'landing' | 'ecommerce' | 'blog' | 'dashboard';
}

export const MockBrowser: React.FC<MockBrowserProps> = ({ 
  palette, 
  device = 'desktop', 
  template = 'landing' 
}) => {
  const primary = palette.colors.find(c => c.role === 'primary')?.hex || '#3b82f6';
  const secondary = palette.colors.find(c => c.role === 'secondary')?.hex || '#64748b';
  const accent = palette.colors.find(c => c.role === 'accent')?.hex || '#f59e0b';
  const surface = palette.colors.find(c => c.role === 'surface')?.hex || '#ffffff';
  const text = palette.colors.find(c => c.role === 'text')?.hex || '#1f2937';

  const deviceDimensions = {
    desktop: { 
      width: 'w-full', 
      height: 'h-[600px]', 
      icon: Monitor,
      scale: 1,
      containerClass: 'max-w-6xl'
    },
    tablet: { 
      width: 'w-[768px]', 
      height: 'h-[600px]', 
      icon: Tablet,
      scale: 0.8,
      containerClass: 'max-w-3xl'
    },
    mobile: { 
      width: 'w-[375px]', 
      height: 'h-[600px]', 
      icon: Smartphone,
      scale: 0.9,
      containerClass: 'max-w-sm'
    },
  };

  const currentDevice = deviceDimensions[device];
  const DeviceIcon = currentDevice.icon;

  const renderTemplate = () => {
    switch (template) {
      case 'ecommerce':
        return renderEcommerceTemplate();
      case 'blog':
        return renderBlogTemplate();
      case 'dashboard':
        return renderDashboardTemplate();
      default:
        return renderLandingTemplate();
    }
  };

  const renderLandingTemplate = () => (
    <div className="h-full overflow-hidden" style={{ backgroundColor: surface }}>
      {/* Header */}
      <div 
        className="h-16 flex items-center justify-between px-6 shadow-sm"
        style={{ backgroundColor: primary }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: accent }}
          >
            B
          </div>
          <div className="text-white font-semibold text-lg">Brand</div>
        </div>
        {device === 'mobile' ? (
          <Menu className="text-white" size={24} />
        ) : (
          <div className="flex items-center gap-6">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <div key={item} className="text-white hover:opacity-80 cursor-pointer">
                {item}
              </div>
            ))}
            <button 
              className="px-4 py-2 rounded-lg font-medium"
              style={{ backgroundColor: accent, color: surface }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="px-6 py-12 text-center">
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: text }}
        >
          Beautiful Design Made Simple
        </h1>
        <p 
          className="text-xl mb-8 opacity-80 max-w-2xl mx-auto"
          style={{ color: text }}
        >
          Experience the power of great design with this beautiful color palette that brings your vision to life
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button 
            className="px-8 py-3 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: primary }}
          >
            Start Free Trial
          </button>
          <button 
            className="px-8 py-3 rounded-lg font-medium border-2 hover:bg-opacity-10 transition-colors"
            style={{ 
              color: secondary,
              borderColor: secondary,
              backgroundColor: 'transparent'
            }}
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Fast Performance', icon: '⚡' },
          { title: 'Secure & Reliable', icon: '🔒' },
          { title: '24/7 Support', icon: '💬' }
        ].map((feature, i) => (
          <div 
            key={i}
            className="p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            style={{ 
              backgroundColor: i === 1 ? accent : surface,
              borderColor: secondary + '20',
              color: i === 1 ? surface : text
            }}
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm opacity-75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEcommerceTemplate = () => (
    <div className="h-full overflow-hidden" style={{ backgroundColor: surface }}>
      {/* Header */}
      <div 
        className="h-16 flex items-center justify-between px-6 border-b"
        style={{ backgroundColor: surface, borderColor: secondary + '20' }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: primary }}
          >
            S
          </div>
          <div style={{ color: text }} className="font-semibold">Shop</div>
        </div>
        <div className="flex items-center gap-4">
          <Search style={{ color: secondary }} size={20} />
          <User style={{ color: secondary }} size={20} />
          <div className="relative">
            <ShoppingCart style={{ color: secondary }} size={20} />
            <div 
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
              style={{ backgroundColor: accent }}
            >
              2
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-6">
        <h2 style={{ color: text }} className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div 
                className="w-full h-32 rounded-lg mb-3 flex items-center justify-center"
                style={{ backgroundColor: i === 2 ? accent + '20' : secondary + '10' }}
              >
                <div 
                  className="w-16 h-16 rounded"
                  style={{ backgroundColor: i === 2 ? accent : primary }}
                ></div>
              </div>
              <h3 style={{ color: text }} className="font-medium mb-1">Product {i}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="currentColor" />
                  ))}
                </div>
                <span style={{ color: secondary }} className="text-xs">(4.5)</span>
              </div>
              <div style={{ color: primary }} className="font-bold">$29.99</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBlogTemplate = () => (
    <div className="h-full overflow-hidden" style={{ backgroundColor: surface }}>
      {/* Header */}
      <div 
        className="h-16 flex items-center justify-between px-6 border-b"
        style={{ backgroundColor: surface, borderColor: secondary + '20' }}
      >
        <div style={{ color: text }} className="text-xl font-bold">Blog</div>
        <div className="flex gap-4">
          {['Latest', 'Tech', 'Design', 'About'].map((item) => (
            <div key={item} style={{ color: secondary }} className="hover:opacity-80 cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="p-6 space-y-6">
        {[1, 2].map((i) => (
          <article key={i} className="border-b pb-6" style={{ borderColor: secondary + '20' }}>
            <div className="flex gap-6">
              <div 
                className="w-24 h-24 rounded-lg flex-shrink-0"
                style={{ backgroundColor: i === 1 ? primary + '20' : accent + '20' }}
              ></div>
              <div className="flex-1">
                <h3 style={{ color: text }} className="text-lg font-semibold mb-2">
                  How to Create Beautiful Color Palettes for Your Next Project
                </h3>
                <p style={{ color: secondary }} className="text-sm mb-3">
                  Discover the secrets of professional designers and learn how to choose colors that work harmoniously together...
                </p>
                <div className="flex items-center gap-4 text-xs" style={{ color: secondary }}>
                  <span>John Doe</span>
                  <span>•</span>
                  <span>5 min read</span>
                  <span>•</span>
                  <span>Dec 15, 2025</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderDashboardTemplate = () => (
    <div className="h-full overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <div className="flex h-full">
        <div 
          className="w-16 flex flex-col items-center py-4 space-y-4"
          style={{ backgroundColor: primary }}
        >
          {[User, Heart, ShoppingCart, Star].map((Icon, i) => (
            <div 
              key={i}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 cursor-pointer"
            >
              <Icon size={20} />
            </div>
          ))}
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 p-6">
          <h1 style={{ color: text }} className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Sales', value: '$12,345', color: primary },
              { label: 'Orders', value: '1,234', color: accent },
              { label: 'Customers', value: '5,678', color: secondary },
              { label: 'Revenue', value: '$45,678', color: primary }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                <div style={{ color: stat.color }} className="text-2xl font-bold">
                  {stat.value}
                </div>
                <div style={{ color: secondary }} className="text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 style={{ color: text }} className="font-semibold mb-4">Revenue Overview</h3>
            <div 
              className="h-32 rounded flex items-end justify-center gap-2"
              style={{ backgroundColor: surface }}
            >
              {[40, 70, 45, 80, 60, 90, 55].map((height, i) => (
                <div 
                  key={i}
                  className="w-8 rounded-t"
                  style={{ 
                    height: `${height}%`,
                    backgroundColor: i === 3 ? accent : primary + '60'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
        <span className="text-gray-400">•</span>
        <span className="capitalize">{template} Template</span>
      </div>

      {/* Browser Window */}
      <div className={`${currentDevice.containerClass} mx-auto`}>
        <div 
          className={`${currentDevice.width} bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-[1.02]`}
          style={{ transform: `scale(${currentDevice.scale})` }}
        >
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
              https://yoursite.com/{template}
            </div>
          </div>

          {/* Website Content */}
          <div className={`${currentDevice.height} overflow-y-auto`}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
