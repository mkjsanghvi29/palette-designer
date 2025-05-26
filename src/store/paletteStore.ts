import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Color, Palette, PaletteType } from '../types/color';
import { generatePalette, generateRandomColor } from '../utils/colorUtils';

interface PaletteStore {
  // Current state
  currentColor: Color;
  currentPalettes: Palette[];
  selectedPalette: Palette | null;
  recentPalettes: Palette[];
  favoritePalettes: Palette[];
  
  // Actions
  setCurrentColor: (color: Color) => void;
  generatePalettes: (color: Color) => void;
  selectPalette: (palette: Palette | null) => void;
  toggleFavorite: (paletteId: string) => void;
  generateRandomPalettes: () => void;
  clearPalettes: () => void;
  
  // Export functionality
  exportPalette: (palette: Palette, format: string) => string;
}

const initialColor: Color = {
  hex: '#3b82f6',
  rgb: { r: 59, g: 130, b: 246 },
  hsl: { h: 217, s: 91, l: 60 },
};

export const usePaletteStore = create<PaletteStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentColor: initialColor,
      currentPalettes: [],
      selectedPalette: null,
      recentPalettes: [],
      favoritePalettes: [],

      // Actions
      setCurrentColor: (color: Color) => {
        set({ currentColor: color });
        // Auto-generate palettes when color changes
        get().generatePalettes(color);
      },

      generatePalettes: (color: Color) => {
        const paletteTypes: PaletteType[] = [
          // Core algorithms
          'monochromatic',
          'analogous',
          'complementary',
          'triadic',
          'material-design',
          'accessibility-focused',
          
          // Emotional palettes for variety
          'emotional-energetic',
          'emotional-calm',
          'emotional-professional',
          
          // Seasonal palettes
          'seasonal-spring',
          'seasonal-autumn',
          
          // Brand and gradient
          'brand-tech',
          'gradient',
        ];

        const newPalettes = paletteTypes.map(type => generatePalette(color, type));
        
        set(state => ({
          currentPalettes: newPalettes,
          recentPalettes: [
            ...newPalettes.slice(0, 3), // Add first 3 new palettes to recent
            ...state.recentPalettes.slice(0, 7), // Keep last 7 recent palettes
          ].slice(0, 10), // Max 10 recent palettes
        }));
      },

      selectPalette: (palette: Palette | null) => {
        set({ selectedPalette: palette });
      },

      toggleFavorite: (paletteId: string) => {
        set(state => {
          const palette = [...state.currentPalettes, ...state.recentPalettes]
            .find(p => p.id === paletteId);
          
          if (!palette) return state;

          const isFavorite = state.favoritePalettes.some(p => p.id === paletteId);
          
          if (isFavorite) {
            return {
              favoritePalettes: state.favoritePalettes.filter(p => p.id !== paletteId),
            };
          } else {
            return {
              favoritePalettes: [...state.favoritePalettes, { ...palette, isFavorite: true }],
            };
          }
        });
      },

      generateRandomPalettes: () => {
        const randomColor = generateRandomColor();
        get().setCurrentColor(randomColor);
      },

      clearPalettes: () => {
        set({
          currentPalettes: [],
          selectedPalette: null,
        });
      },

      exportPalette: (palette: Palette, format: string): string => {
        switch (format) {
          case 'css-variables':
            return generateCSSVariables(palette);
          case 'scss-variables':
            return generateSCSSVariables(palette);
          case 'json':
            return JSON.stringify(palette, null, 2);
          default:
            return JSON.stringify(palette, null, 2);
        }
      },
    }),
    {
      name: 'palette-store',
      partialize: (state) => ({
        recentPalettes: state.recentPalettes,
        favoritePalettes: state.favoritePalettes,
        currentColor: state.currentColor,
      }),
    }
  )
);

// Export format generators
const generateCSSVariables = (palette: Palette): string => {
  const variables = palette.colors.map(color => {
    const name = `--color-${color.role}${color.variant ? `-${color.variant}` : ''}`;
    return `  ${name}: ${color.hex};`;
  }).join('\n');

  return `:root {\n${variables}\n}`;
};

const generateSCSSVariables = (palette: Palette): string => {
  const variables = palette.colors.map(color => {
    const name = `$color-${color.role}${color.variant ? `-${color.variant}` : ''}`;
    return `${name}: ${color.hex};`;
  }).join('\n');

  return variables;
};