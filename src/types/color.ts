export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name?: string;
}

export interface PaletteColor extends Color {
  id: string;
  role: 'primary' | 'secondary' | 'accent' | 'neutral' | 'surface' | 'text';
  variant?: 'light' | 'normal' | 'dark';
  contrastRatio?: number;
}

export interface Palette {
  id: string;
  name: string;
  type: PaletteType;
  colors: PaletteColor[];
  baseColor: Color;
  createdAt: Date;
  isFavorite?: boolean;
}

export type PaletteType = 
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'material-design'
  | 'accessibility-focused';

export type ExportFormat = 
  | 'css-variables'
  | 'scss-variables'
  | 'json'
  | 'svg-swatches'
  | 'png-swatches'
  | 'figma-plugin'
  | 'adobe-swatches';

export interface ColorInput {
  type: 'hex' | 'rgb' | 'hsl' | 'name';
  value: string | { r: number; g: number; b: number } | { h: number; s: number; l: number };
}

export interface ContrastResult {
  ratio: number;
  wcagLevel: 'AA' | 'AAA' | 'fail';
  isAccessible: boolean;
}