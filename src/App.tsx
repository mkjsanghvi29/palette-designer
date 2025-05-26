import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePaletteStore } from './store/paletteStore';
import { Header } from './components/Header';
import { ColorInput } from './components/ColorInput';
import { PaletteGrid } from './components/PaletteGrid';
import ExportPanel from './components/ExportPanel';
import './App.css';

function App() {
  const { currentColor, selectedPalette, generatePalettes } = usePaletteStore();

  // Generate initial palettes when the app loads
  useEffect(() => {
    generatePalettes(currentColor);
  }, [generatePalettes, currentColor]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header />

      {/* Main Content - Uses remaining space */}
      <main className="flex-1 flex overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-auto">
          {/* Left Sidebar - Color Input */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ColorInput />
            </motion.div>

            {/* Export Panel - Show when a palette is selected */}
            {selectedPalette && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <ExportPanel palette={selectedPalette} />
              </motion.div>
            )}
          </div>

          {/* Right Main Area - Palette Grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PaletteGrid />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
