import React, { useState, useCallback } from 'react';
import { SketchPicker } from 'react-color';
import { Shuffle, Palette, Hash, Circle, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePaletteStore } from '../store/paletteStore';
import { hexToColor, rgbToColor, hslToColor, isValidHex, isValidRGB, isValidHSL } from '../utils/colorUtils';

type InputMode = 'picker' | 'hex' | 'rgb' | 'hsl';

export const ColorInput: React.FC = () => {
  const { currentColor, setCurrentColor, generateRandomPalettes } = usePaletteStore();
  const [inputMode, setInputMode] = useState<InputMode>('picker');
  const [showPicker, setShowPicker] = useState(false);
  
  // Input states
  const [hexInput, setHexInput] = useState(currentColor.hex);
  const [rgbInput, setRgbInput] = useState(currentColor.rgb);
  const [hslInput, setHslInput] = useState(currentColor.hsl);

  const handleColorChange = useCallback((color: { hex: string }) => {
    const newColor = hexToColor(color.hex);
    setCurrentColor(newColor);
    setHexInput(newColor.hex);
    setRgbInput(newColor.rgb);
    setHslInput(newColor.hsl);
  }, [setCurrentColor]);

  const handleHexSubmit = useCallback(() => {
    if (isValidHex(hexInput)) {
      const newColor = hexToColor(hexInput);
      setCurrentColor(newColor);
      setRgbInput(newColor.rgb);
      setHslInput(newColor.hsl);
    }
  }, [hexInput, setCurrentColor]);

  const handleRgbSubmit = useCallback(() => {
    if (isValidRGB(rgbInput.r, rgbInput.g, rgbInput.b)) {
      const newColor = rgbToColor(rgbInput.r, rgbInput.g, rgbInput.b);
      setCurrentColor(newColor);
      setHexInput(newColor.hex);
      setHslInput(newColor.hsl);
    }
  }, [rgbInput, setCurrentColor]);

  const handleHslSubmit = useCallback(() => {
    if (isValidHSL(hslInput.h, hslInput.s, hslInput.l)) {
      const newColor = hslToColor(hslInput.h, hslInput.s, hslInput.l);
      setCurrentColor(newColor);
      setHexInput(newColor.hex);
      setRgbInput(newColor.rgb);
    }
  }, [hslInput, setCurrentColor]);

  const inputModeButtons = [
    { mode: 'picker' as const, icon: Palette, label: 'Picker' },
    { mode: 'hex' as const, icon: Hash, label: 'Hex' },
    { mode: 'rgb' as const, icon: Circle, label: 'RGB' },
    { mode: 'hsl' as const, icon: Sliders, label: 'HSL' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Color Input</h2>
        <button
          onClick={generateRandomPalettes}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          <Shuffle size={16} />
          Surprise Me
        </button>
      </div>

      {/* Mode Selection */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        {inputModeButtons.map(({ mode, icon: Icon, label }) => (
          <button
            key={mode}
            onClick={() => setInputMode(mode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              inputMode === mode
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Color Preview */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-lg shadow-sm border-2 border-gray-200 dark:border-gray-600 cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundColor: currentColor.hex }}
          onClick={() => inputMode === 'picker' && setShowPicker(!showPicker)}
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <div className="font-medium">{currentColor.hex.toUpperCase()}</div>
          <div>RGB({currentColor.rgb.r}, {currentColor.rgb.g}, {currentColor.rgb.b})</div>
          <div>HSL({Math.round(currentColor.hsl.h)}°, {Math.round(currentColor.hsl.s)}%, {Math.round(currentColor.hsl.l)}%)</div>
        </div>
      </div>

      {/* Input Methods */}
      <AnimatePresence mode="wait">
        {inputMode === 'picker' && (
          <motion.div
            key="picker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {showPicker && (
              <div className="mt-4">
                <SketchPicker
                  color={currentColor.hex}
                  onChange={handleColorChange}
                  disableAlpha
                  width="100%"
                />
              </div>
            )}
          </motion.div>
        )}

        {inputMode === 'hex' && (
          <motion.div
            key="hex"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hex Color</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                onBlur={handleHexSubmit}
                onKeyPress={(e) => e.key === 'Enter' && handleHexSubmit()}
                placeholder="#RRGGBB"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleHexSubmit}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Apply
              </button>
            </div>
            {!isValidHex(hexInput) && hexInput.length > 0 && (
              <p className="text-sm text-red-600 dark:text-red-400">Invalid hex format. Use #RRGGBB</p>
            )}
          </motion.div>
        )}

        {inputMode === 'rgb' && (
          <motion.div
            key="rgb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">RGB Values</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Red (0-255)</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbInput.r}
                  onChange={(e) => setRgbInput(prev => ({ ...prev, r: parseInt(e.target.value) || 0 }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Green (0-255)</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbInput.g}
                  onChange={(e) => setRgbInput(prev => ({ ...prev, g: parseInt(e.target.value) || 0 }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Blue (0-255)</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgbInput.b}
                  onChange={(e) => setRgbInput(prev => ({ ...prev, b: parseInt(e.target.value) || 0 }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={handleRgbSubmit}
              className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Apply RGB
            </button>
          </motion.div>
        )}

        {inputMode === 'hsl' && (
          <motion.div
            key="hsl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HSL Values</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hue (0-360°)</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={Math.round(hslInput.h)}
                  onChange={(e) => setHslInput(prev => ({ ...prev, h: parseInt(e.target.value) || 0 }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Saturation (0-100%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={Math.round(hslInput.s)}
                  onChange={(e) => setHslInput(prev => ({ ...prev, s: parseInt(e.target.value) || 0 }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Lightness (0-100%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={Math.round(hslInput.l)}
                  onChange={(e) => setHslInput(prev => ({ ...prev, l: parseInt(e.target.value) || 0 }))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={handleHslSubmit}
              className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Apply HSL
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};