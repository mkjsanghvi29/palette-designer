import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Eye, Palette as PaletteIcon, Monitor, Smartphone, Tablet, Layers, ShoppingBag, FileText, BarChart3 } from 'lucide-react';
import { usePaletteStore } from '../store/paletteStore';
import { MockBrowser } from './MockBrowser';
import type { Palette, PaletteColor } from '../types/color';

interface PaletteCardProps {
  palette: Palette;
  onSelect: (palette: Palette) => void;
  onToggleFavorite: (paletteId: string) => void;
  isFavorite: boolean;
}

const PaletteCard: React.FC<PaletteCardProps> = ({ palette, onSelect, onToggleFavorite, isFavorite }) => {
  const handleCopyPalette = (e: React.MouseEvent) => {
    e.stopPropagation();
    const colors = palette.colors.map(color => color.hex).join(', ');
    navigator.clipboard.writeText(colors);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
      onClick={() => onSelect(palette)}
    >
      {/* Color Swatches */}
      <div className="flex h-28 lg:h-32">
        {palette.colors.slice(0, 5).map((color) => (
          <div
            key={color.id}
            className="flex-1 relative group transition-all duration-300"
            style={{ backgroundColor: color.hex }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 px-2 py-1 rounded">
                {color.hex}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Palette Info */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm lg:text-base">{palette.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(palette.id);
            }}
            className={`p-1 rounded transition-colors ${
              isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 dark:text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{palette.colors.length} colors</span>
          <div className="flex gap-2">
            <button
              onClick={handleCopyPalette}
              className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Copy palette"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(palette);
              }}
              className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="View details"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface ColorSwatchProps {
  color: PaletteColor;
  size?: 'sm' | 'md' | 'lg';
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const handleCopyColor = () => {
    navigator.clipboard.writeText(color.hex);
  };

  return (
    <div className="group">
      <div
        className={`${sizeClasses[size]} rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 cursor-pointer transition-all hover:scale-105 hover:shadow-md`}
        style={{ backgroundColor: color.hex }}
        onClick={handleCopyColor}
        title={`Copy ${color.hex}`}
      />
      <div className="mt-2 text-center">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">{color.role}</div>
        {color.variant && (
          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{color.variant}</div>
        )}
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{color.hex}</div>
      </div>
    </div>
  );
};

export const PaletteGrid: React.FC = () => {
  const { currentPalettes, selectedPalette, selectPalette, toggleFavorite, favoritePalettes } = usePaletteStore();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewTemplate, setPreviewTemplate] = useState<'landing' | 'ecommerce' | 'blog' | 'dashboard'>('landing');

  const isFavorite = (paletteId: string) => {
    return favoritePalettes.some(p => p.id === paletteId);
  };

  const deviceOptions = [
    { device: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { device: 'tablet' as const, icon: Tablet, label: 'Tablet' },
    { device: 'mobile' as const, icon: Smartphone, label: 'Mobile' },
  ];

  const templateOptions = [
    { template: 'landing' as const, icon: Layers, label: 'Landing Page' },
    { template: 'ecommerce' as const, icon: ShoppingBag, label: 'E-commerce' },
    { template: 'blog' as const, icon: FileText, label: 'Blog' },
    { template: 'dashboard' as const, icon: BarChart3, label: 'Dashboard' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Selected Palette Detail View */}
      {selectedPalette ? (
        <div className="flex flex-col min-h-screen">
          {/* Header with controls */}
          <div className="flex-shrink-0 p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{selectedPalette.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedPalette.colors.length} colors • {selectedPalette.type} palette
                </p>
              </div>
              <button
                onClick={() => selectPalette(null)}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Grid
              </button>
            </div>

            {/* Device and Template Controls */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Device Selection */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Device:</span>
                <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                  {deviceOptions.map(({ device, icon: Icon, label }) => (
                    <button
                      key={device}
                      onClick={() => setPreviewDevice(device)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        previewDevice === device
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Selection */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Template:</span>
                <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                  {templateOptions.map(({ template, icon: Icon, label }) => (
                    <button
                      key={template}
                      onClick={() => setPreviewTemplate(template)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        previewTemplate === template
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="hidden md:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex">
            {/* Preview */}
            <div className="flex-1 p-6 overflow-y-auto">
              <MockBrowser palette={selectedPalette} device={previewDevice} template={previewTemplate} />
            </div>

            {/* Color Swatches Sidebar */}
            <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Palette Colors</h3>
              <div className="space-y-4">
                {selectedPalette.colors.map((color) => (
                  <ColorSwatch key={color.id} color={color} size="lg" />
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Palette Details</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <div className="flex justify-between">
                    <span>Base Color:</span>
                    <span className="font-mono">{selectedPalette.baseColor.hex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{selectedPalette.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Colors:</span>
                    <span>{selectedPalette.colors.length}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => toggleFavorite(selectedPalette.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isFavorite(selectedPalette.id)
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Heart size={16} fill={isFavorite(selectedPalette.id) ? 'currentColor' : 'none'} />
                    {isFavorite(selectedPalette.id) ? 'Favorited' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Palette Grid View */
        <div className="p-6">
          <div className="space-y-8">
            {/* Generated Palettes */}
            {currentPalettes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Generated Palettes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {currentPalettes.map((palette) => (
                    <PaletteCard
                      key={palette.id}
                      palette={palette}
                      onSelect={selectPalette}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isFavorite(palette.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Favorite Palettes */}
            {favoritePalettes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Favorite Palettes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {favoritePalettes.map((palette) => (
                    <PaletteCard
                      key={palette.id}
                      palette={palette}
                      onSelect={selectPalette}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {currentPalettes.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-6">
                  <PaletteIcon size={64} className="mx-auto" />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-3">No palettes yet</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Select a color in the sidebar to generate beautiful, professional-grade palettes
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
