import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePaletteStore } from './store/paletteStore';
import { Header } from './components/Header';
import { ColorInput } from './components/ColorInput';
import { PaletteGrid } from './components/PaletteGrid';
import ExportPanel from './components/ExportPanel';

function App() {
  const { currentColor, selectedPalette, generatePalettes } = usePaletteStore();

  // Generate initial palettes when the app loads
  useEffect(() => {
    generatePalettes(currentColor);
  }, [generatePalettes, currentColor]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header />

      {/* Main Content - Uses remaining space */}
      <main className="flex-1 flex">
        {/* Left Sidebar - Fixed width for controls, collapsible on mobile */}
        <div className="w-80 lg:w-80 md:w-72 sm:w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hidden md:block">
          <div className="p-4 lg:p-6 space-y-4 lg:space-y-6 h-screen overflow-y-auto">
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
        </div>

        {/* Mobile Controls - Show on small screens */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="p-3">
            <ColorInput />
          </div>
        </div>

        {/* Right Main Area - Full remaining space for Palette Grid */}
        <div className="flex-1 pb-24 md:pb-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <PaletteGrid />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;
