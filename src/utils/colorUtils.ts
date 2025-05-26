import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import type { Color, PaletteColor, Palette, PaletteType, ContrastResult } from '../types/color';

// Extend colord with accessibility plugin
extend([a11yPlugin]);

// Color conversion utilities
export const hexToColor = (hex: string): Color => {
  const color = colord(hex);
  return {
    hex: color.toHex(),
    rgb: color.toRgb(),
    hsl: color.toHsl(),
  };
};

export const rgbToColor = (r: number, g: number, b: number): Color => {
  const color = colord({ r, g, b });
  return {
    hex: color.toHex(),
    rgb: color.toRgb(),
    hsl: color.toHsl(),
  };
};

export const hslToColor = (h: number, s: number, l: number): Color => {
  const color = colord({ h, s, l });
  return {
    hex: color.toHex(),
    rgb: color.toRgb(),
    hsl: color.toHsl(),
  };
};

// Palette generation algorithms
export const generateMonochromaticPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Generate tints and shades
  const lightnesses = [95, 80, 65, 50, 35, 20, 5];
  const roles = ['surface', 'primary', 'primary', 'primary', 'primary', 'text', 'text'] as const;
  const variants = ['light', 'light', 'normal', 'normal', 'dark', 'dark', 'dark'] as const;
  
  lightnesses.forEach((lightness, index) => {
    const hsl = base.toHsl();
    const color = colord({ h: hsl.h, s: hsl.s, l: lightness });
    colors.push({
      id: `mono-${index}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: roles[index],
      variant: variants[index],
    });
  });
  
  return colors;
};

export const generateAnalogousPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Base color
  colors.push({
    id: 'analogous-base',
    ...baseColor,
    role: 'primary',
    variant: 'normal',
  });
  
  // Adjacent colors (±30°)
  [-30, -15, 15, 30].forEach((hueShift, index) => {
    const color = base.rotate(hueShift);
    colors.push({
      id: `analogous-${index}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: index < 2 ? 'secondary' : 'accent',
      variant: 'normal',
    });
  });
  
  return colors;
};

export const generateComplementaryPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const complement = base.rotate(180);
  
  return [
    {
      id: 'comp-primary',
      ...baseColor,
      role: 'primary',
      variant: 'normal',
    },
    {
      id: 'comp-secondary',
      hex: complement.toHex(),
      rgb: complement.toRgb(),
      hsl: complement.toHsl(),
      role: 'secondary',
      variant: 'normal',
    },
    {
      id: 'comp-primary-light',
      hex: base.lighten(0.2).toHex(),
      rgb: base.lighten(0.2).toRgb(),
      hsl: base.lighten(0.2).toHsl(),
      role: 'primary',
      variant: 'light',
    },
    {
      id: 'comp-primary-dark',
      hex: base.darken(0.2).toHex(),
      rgb: base.darken(0.2).toRgb(),
      hsl: base.darken(0.2).toHsl(),
      role: 'primary',
      variant: 'dark',
    },
    {
      id: 'comp-secondary-light',
      hex: complement.lighten(0.2).toHex(),
      rgb: complement.lighten(0.2).toRgb(),
      hsl: complement.lighten(0.2).toHsl(),
      role: 'secondary',
      variant: 'light',
    },
  ];
};

export const generateTriadicPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Three colors 120° apart
  [0, 120, 240].forEach((rotation, index) => {
    const color = base.rotate(rotation);
    const roles = ['primary', 'secondary', 'accent'] as const;
    
    colors.push({
      id: `triadic-${index}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: roles[index],
      variant: 'normal',
    });
  });
  
  return colors;
};

export const generateSplitComplementaryPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  
  return [
    {
      id: 'split-primary',
      ...baseColor,
      role: 'primary',
      variant: 'normal',
    },
    {
      id: 'split-secondary-1',
      hex: base.rotate(150).toHex(),
      rgb: base.rotate(150).toRgb(),
      hsl: base.rotate(150).toHsl(),
      role: 'secondary',
      variant: 'normal',
    },
    {
      id: 'split-secondary-2',
      hex: base.rotate(210).toHex(),
      rgb: base.rotate(210).toRgb(),
      hsl: base.rotate(210).toHsl(),
      role: 'accent',
      variant: 'normal',
    },
  ];
};

export const generateTetradicPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Four colors 90° apart
  [0, 90, 180, 270].forEach((rotation, index) => {
    const color = base.rotate(rotation);
    const roles = ['primary', 'secondary', 'accent', 'neutral'] as const;
    
    colors.push({
      id: `tetradic-${index}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: roles[index],
      variant: 'normal',
    });
  });
  
  return colors;
};

export const generateMaterialDesignPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Material Design inspired shades
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const lightnesses = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  
  shades.forEach((shade, index) => {
    const hsl = base.toHsl();
    const color = colord({ h: hsl.h, s: hsl.s, l: lightnesses[index] });
    colors.push({
      id: `material-${shade}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: shade === 500 ? 'primary' : shade < 500 ? 'surface' : 'text',
      variant: shade < 300 ? 'light' : shade > 700 ? 'dark' : 'normal',
      name: `${shade}`,
    });
  });
  
  return colors;
};

export const generateAccessibilityFocusedPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Generate colors with high contrast ratios
  const white = colord('#ffffff');
  const black = colord('#000000');
  
  // Primary color variants with good contrast
  const baseHsl = base.toHsl();
  const primaryLight = colord({ h: baseHsl.h, s: baseHsl.s, l: 85 });
  const primaryNormal = colord({ h: baseHsl.h, s: baseHsl.s, l: 50 });
  const primaryDark = colord({ h: baseHsl.h, s: baseHsl.s, l: 15 });
  
  colors.push(
    {
      id: 'a11y-primary-light',
      hex: primaryLight.toHex(),
      rgb: primaryLight.toRgb(),
      hsl: primaryLight.toHsl(),
      role: 'primary',
      variant: 'light',
      contrastRatio: 4.5,
    },
    {
      id: 'a11y-primary',
      hex: primaryNormal.toHex(),
      rgb: primaryNormal.toRgb(),
      hsl: primaryNormal.toHsl(),
      role: 'primary',
      variant: 'normal',
      contrastRatio: 4.5,
    },
    {
      id: 'a11y-primary-dark',
      hex: primaryDark.toHex(),
      rgb: primaryDark.toRgb(),
      hsl: primaryDark.toHsl(),
      role: 'primary',
      variant: 'dark',
      contrastRatio: 7,
    },
    {
      id: 'a11y-surface',
      hex: '#ffffff',
      rgb: white.toRgb(),
      hsl: white.toHsl(),
      role: 'surface',
      variant: 'light',
      contrastRatio: 21,
    },
    {
      id: 'a11y-text',
      hex: '#000000',
      rgb: black.toRgb(),
      hsl: black.toHsl(),
      role: 'text',
      variant: 'dark',
      contrastRatio: 21,
    },
  );
  
  return colors;
};

// Enhanced AI-inspired palette generators
export const generateEmotionalPalette = (baseColor: Color, emotion: 'energetic' | 'calm' | 'warm' | 'cool' | 'professional' | 'creative'): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Emotional color mapping based on color psychology
  const emotionMappings = {
    energetic: {
      saturations: [90, 80, 85, 75, 70],
      lightnesses: [50, 60, 40, 70, 55],
      hueShifts: [0, 30, -30, 60, -60]
    },
    calm: {
      saturations: [40, 35, 45, 30, 50],
      lightnesses: [70, 80, 65, 75, 60],
      hueShifts: [0, 15, -15, 30, -30]
    },
    warm: {
      saturations: [70, 65, 75, 60, 80],
      lightnesses: [55, 65, 45, 70, 50],
      hueShifts: [0, 25, -20, 40, -15]
    },
    cool: {
      saturations: [60, 55, 65, 50, 70],
      lightnesses: [60, 70, 50, 75, 55],
      hueShifts: [0, -25, 20, -40, 15]
    },
    professional: {
      saturations: [50, 45, 55, 40, 60],
      lightnesses: [45, 55, 35, 65, 50],
      hueShifts: [0, 180, 20, -20, 40]
    },
    creative: {
      saturations: [85, 75, 90, 70, 80],
      lightnesses: [55, 45, 65, 35, 75],
      hueShifts: [0, 120, -120, 60, -60]
    }
  };
  
  const mapping = emotionMappings[emotion];
  const baseHsl = base.toHsl();
  
  mapping.saturations.forEach((saturation, index) => {
    const hue = (baseHsl.h + mapping.hueShifts[index] + 360) % 360;
    const color = colord({ h: hue, s: saturation, l: mapping.lightnesses[index] });
    
    const roles = ['primary', 'secondary', 'accent', 'surface', 'text'] as const;
    colors.push({
      id: `emotional-${emotion}-${index}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: roles[index] || 'neutral',
      variant: index === 0 ? 'normal' : index < 3 ? 'light' : 'dark',
    });
  });
  
  return colors;
};

export const generateBrandPalette = (baseColor: Color, industry: 'tech' | 'finance' | 'healthcare' | 'education' | 'food' | 'fashion'): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  // Industry-specific color strategies
  const industryStrategies = {
    tech: {
      primary: { s: 70, l: 50 },
      secondary: { hueShift: 180, s: 45, l: 60 },
      accent: { hueShift: 30, s: 80, l: 55 },
      neutral: { s: 10, l: 75 },
      text: { s: 15, l: 20 }
    },
    finance: {
      primary: { s: 60, l: 45 },
      secondary: { hueShift: 200, s: 40, l: 55 },
      accent: { hueShift: -30, s: 65, l: 50 },
      neutral: { s: 5, l: 85 },
      text: { s: 10, l: 15 }
    },
    healthcare: {
      primary: { s: 55, l: 55 },
      secondary: { hueShift: 120, s: 45, l: 65 },
      accent: { hueShift: -60, s: 70, l: 60 },
      neutral: { s: 8, l: 90 },
      text: { s: 20, l: 25 }
    },
    education: {
      primary: { s: 65, l: 50 },
      secondary: { hueShift: 60, s: 50, l: 60 },
      accent: { hueShift: -90, s: 75, l: 55 },
      neutral: { s: 12, l: 80 },
      text: { s: 25, l: 20 }
    },
    food: {
      primary: { s: 75, l: 55 },
      secondary: { hueShift: 45, s: 60, l: 65 },
      accent: { hueShift: -45, s: 85, l: 50 },
      neutral: { s: 15, l: 85 },
      text: { s: 30, l: 25 }
    },
    fashion: {
      primary: { s: 80, l: 45 },
      secondary: { hueShift: 150, s: 55, l: 60 },
      accent: { hueShift: -120, s: 90, l: 55 },
      neutral: { s: 5, l: 95 },
      text: { s: 0, l: 10 }
    }
  };
  
  const strategy = industryStrategies[industry];
  const baseHsl = base.toHsl();
  
  Object.entries(strategy).forEach(([role, config]) => {
    const hue = 'hueShift' in config ? 
      (baseHsl.h + config.hueShift + 360) % 360 : 
      baseHsl.h;
    
    const color = colord({ 
      h: hue, 
      s: config.s, 
      l: config.l 
    });
    
    colors.push({
      id: `brand-${industry}-${role}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: role as any,
      variant: 'normal',
    });
  });
  
  return colors;
};

export const generateSeasonalPalette = (baseColor: Color, season: 'spring' | 'summer' | 'autumn' | 'winter'): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  
  const seasonalAdjustments = {
    spring: {
      saturations: [65, 55, 70, 45, 60],
      lightnesses: [65, 75, 55, 80, 60],
      hueShifts: [0, 30, -30, 60, 15]
    },
    summer: {
      saturations: [70, 60, 80, 50, 75],
      lightnesses: [60, 70, 50, 75, 55],
      hueShifts: [0, 45, -45, 90, -15]
    },
    autumn: {
      saturations: [75, 65, 85, 55, 70],
      lightnesses: [50, 60, 40, 65, 45],
      hueShifts: [0, 25, -35, 50, -20]
    },
    winter: {
      saturations: [60, 50, 70, 40, 65],
      lightnesses: [45, 55, 35, 70, 40],
      hueShifts: [0, 180, 20, -20, 160]
    }
  };
  
  const adjustment = seasonalAdjustments[season];
  const baseHsl = base.toHsl();
  
  adjustment.saturations.forEach((saturation, index) => {
    const hue = (baseHsl.h + adjustment.hueShifts[index] + 360) % 360;
    const color = colord({ h: hue, s: saturation, l: adjustment.lightnesses[index] });
    
    const roles = ['primary', 'secondary', 'accent', 'surface', 'text'] as const;
    colors.push({
      id: `seasonal-${season}-${index}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: roles[index] || 'neutral',
      variant: index === 0 ? 'normal' : index < 3 ? 'light' : 'dark',
    });
  });
  
  return colors;
};

export const generateGradientPalette = (baseColor: Color): PaletteColor[] => {
  const base = colord(baseColor.hex);
  const colors: PaletteColor[] = [];
  const baseHsl = base.toHsl();
  
  // Create smooth gradient transitions
  const steps = [
    { l: 90, s: baseHsl.s * 0.3, role: 'surface', variant: 'light' },
    { l: 70, s: baseHsl.s * 0.6, role: 'secondary', variant: 'light' },
    { l: 50, s: baseHsl.s, role: 'primary', variant: 'normal' },
    { l: 35, s: baseHsl.s * 1.1, role: 'primary', variant: 'dark' },
    { l: 20, s: baseHsl.s * 0.8, role: 'text', variant: 'dark' },
  ];
  
  steps.forEach((step, index) => {
    const color = colord({ 
      h: baseHsl.h, 
      s: Math.min(100, step.s), 
      l: step.l 
    });
    
    colors.push({
      id: `gradient-${index}`,
      hex: color.toHex(),
      rgb: color.toRgb(),
      hsl: color.toHsl(),
      role: step.role as any,
      variant: step.variant as any,
    });
  });
  
  return colors;
};

// Palette generation dispatcher
export const generatePalette = (baseColor: Color, type: PaletteType): Palette => {
  let colors: PaletteColor[] = [];
  
  switch (type) {
    case 'monochromatic':
      colors = generateMonochromaticPalette(baseColor);
      break;
    case 'analogous':
      colors = generateAnalogousPalette(baseColor);
      break;
    case 'complementary':
      colors = generateComplementaryPalette(baseColor);
      break;
    case 'triadic':
      colors = generateTriadicPalette(baseColor);
      break;
    case 'split-complementary':
      colors = generateSplitComplementaryPalette(baseColor);
      break;
    case 'tetradic':
      colors = generateTetradicPalette(baseColor);
      break;
    case 'material-design':
      colors = generateMaterialDesignPalette(baseColor);
      break;
    case 'accessibility-focused':
      colors = generateAccessibilityFocusedPalette(baseColor);
      break;
    
    // Emotional palettes
    case 'emotional-energetic':
      colors = generateEmotionalPalette(baseColor, 'energetic');
      break;
    case 'emotional-calm':
      colors = generateEmotionalPalette(baseColor, 'calm');
      break;
    case 'emotional-warm':
      colors = generateEmotionalPalette(baseColor, 'warm');
      break;
    case 'emotional-cool':
      colors = generateEmotionalPalette(baseColor, 'cool');
      break;
    case 'emotional-professional':
      colors = generateEmotionalPalette(baseColor, 'professional');
      break;
    case 'emotional-creative':
      colors = generateEmotionalPalette(baseColor, 'creative');
      break;
    
    // Brand palettes
    case 'brand-tech':
      colors = generateBrandPalette(baseColor, 'tech');
      break;
    case 'brand-finance':
      colors = generateBrandPalette(baseColor, 'finance');
      break;
    case 'brand-healthcare':
      colors = generateBrandPalette(baseColor, 'healthcare');
      break;
    case 'brand-education':
      colors = generateBrandPalette(baseColor, 'education');
      break;
    case 'brand-food':
      colors = generateBrandPalette(baseColor, 'food');
      break;
    case 'brand-fashion':
      colors = generateBrandPalette(baseColor, 'fashion');
      break;
    
    // Seasonal palettes
    case 'seasonal-spring':
      colors = generateSeasonalPalette(baseColor, 'spring');
      break;
    case 'seasonal-summer':
      colors = generateSeasonalPalette(baseColor, 'summer');
      break;
    case 'seasonal-autumn':
      colors = generateSeasonalPalette(baseColor, 'autumn');
      break;
    case 'seasonal-winter':
      colors = generateSeasonalPalette(baseColor, 'winter');
      break;
    
    // Gradient palette
    case 'gradient':
      colors = generateGradientPalette(baseColor);
      break;
    
    default:
      colors = generateMonochromaticPalette(baseColor);
      break;
  }
  
  return {
    id: `${type}-${Date.now()}`,
    name: type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' '),
    type,
    colors,
    baseColor,
    createdAt: new Date(),
  };
};

// Accessibility utilities
export const calculateContrastRatio = (color1: string, color2: string): ContrastResult => {
  // TODO: Implement proper contrast calculation using colord
  // This is a placeholder implementation
  console.log('Calculating contrast for:', color1, color2);
  const ratio = 4.5; // Placeholder
  
  let wcagLevel: 'AA' | 'AAA' | 'fail' = 'fail';
  if (ratio >= 7) wcagLevel = 'AAA';
  else if (ratio >= 4.5) wcagLevel = 'AA';
  
  return {
    ratio,
    wcagLevel,
    isAccessible: ratio >= 4.5,
  };
};

// Random color generation
export const generateRandomColor = (): Color => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
  const lightness = Math.floor(Math.random() * 40) + 30; // 30-70%
  
  return hslToColor(hue, saturation, lightness);
};

// Color validation
export const isValidHex = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

export const isValidRGB = (r: number, g: number, b: number): boolean => {
  return [r, g, b].every(val => val >= 0 && val <= 255 && Number.isInteger(val));
};

export const isValidHSL = (h: number, s: number, l: number): boolean => {
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
};