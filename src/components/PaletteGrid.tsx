import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Copy, Eye, Palette as PaletteIcon, Monitor, Smartphone, Tablet } from 'lucide-react';
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
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg dark:hover:shadow-xl transition-shadow"
      onClick={() => onSelect(palette)}
    >
      {/* Color Swatches */}
      <div className="flex h-24">
        {palette.colors.slice(0, 6).map((color) => (
          <div
            key={color.id}
            className="flex-1 relative group"
            style={{ backgroundColor: color.hex }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {color.hex}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Palette Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">{palette.name}</h3>
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
    lg: 'w-16 h-16',
  };

  const handleCopyColor = () => {
    navigator.clipboard.writeText(color.hex);
  };

  return (
    <div className="group">
      <div
        className={`${sizeClasses[size]} rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 cursor-pointer transition-transform hover:scale-105`}
        style={{ backgroundColor: color.hex }}
        onClick={handleCopyColor}
        title={`Copy ${color.hex}`}
      />
      <div className="mt-1 text-center">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{color.role}</div>
        {color.variant && (
          <div className="text-xs text-gray-500 dark:text-gray-400">{color.variant}</div>
        )}
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{color.hex}</div>
      </div>
    </div>
  );
};

export const PaletteGrid: React.FC = () => {
  const { currentPalettes, selectedPalette, selectPalette, toggleFavorite, favoritePalettes } = usePaletteStore();
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const isFavorite = (paletteId: string) => {
    return favoritePalettes.some(p => p.id === paletteId);
  };

  return (
    <div className="space-y-6">
      {/* Generated Palettes */}
      {currentPalettes.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generated Palettes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

      {/* Selected Palette Details with MockBrowser */}
      {selectedPalette && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedPalette.name}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(selectedPalette.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite(selectedPalette.id)
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50'
                    : 'text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <Heart size={20} fill={isFavorite(selectedPalette.id) ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => {
                  const colors = selectedPalette.colors.map(color => color.hex).join(', ');
                  navigator.clipboard.writeText(colors);
                }}
                className="p-2 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          {/* Device Preview Toggle */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview:</span>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['desktop', 'tablet', 'mobile'] as const).map((device) => {
                const icons = { desktop: Monitor, tablet: Tablet, mobile: Smartphone };
                const Icon = icons[device];
                return (
                  <button
                    key={device}
                    onClick={() => setPreviewDevice(device)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                      previewDevice === device
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="capitalize">{device}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MockBrowser Preview */}
          <div className="mb-6">
            <MockBrowser palette={selectedPalette} device={previewDevice} />
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {selectedPalette.colors.map((color) => (
              <ColorSwatch key={color.id} color={color} size="lg" />
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>Base color: {selectedPalette.baseColor.hex}</p>
            <p>Palette type: {selectedPalette.type}</p>
            <p>Colors: {selectedPalette.colors.length}</p>
          </div>
        </motion.div>
      )}

      {/* Favorite Palettes */}
      {favoritePalettes.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Favorite Palettes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <PaletteIcon size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No palettes yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Select a color above to generate beautiful palettes
          </p>
        </div>
      )}
    </div>
  );
};