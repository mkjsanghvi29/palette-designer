# UI Palette Designer

A modern, intuitive web application that helps developers generate beautiful color palettes from a single input color. Transform any color into professional-grade palettes with export capabilities for immediate use in web development projects.

## Features

🎨 **Core Palette Generation**
- Modern color picker interface
- Multiple input methods (Hex, RGB, HSL)
- Random color generation
- 8 palette generation algorithms:
  - Monochromatic
  - Analogous
  - Complementary
  - Triadic
  - Split-Complementary
  - Tetradic
  - Material Design
  - Accessibility Focused

📤 **Export & Integration**
- CSS Variables format
- SCSS Variables format
- JSON data format
- Tailwind CSS configuration
- One-click copy to clipboard
- Download functionality

💾 **Palette Management**
- Local storage persistence
- Favorite palettes
- Recent palette history
- Visual palette browser

🖼️ **Modern Interface**
- Responsive design (mobile-first)
- Smooth animations with Framer Motion
- Clean, minimalist design
- Accessibility-focused UI

## Technology Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Colord** - Advanced color manipulation
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd palette-designer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Select a Color**: Use the color picker, or enter Hex/RGB/HSL values
2. **Browse Palettes**: View generated palettes in different harmony types
3. **Customize**: Click on any palette to view detailed colors
4. **Export**: Choose your preferred format and copy/download
5. **Save Favorites**: Star palettes to save them for later

## Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── ColorInput.tsx  # Color input methods
│   ├── PaletteGrid.tsx # Palette display
│   ├── ExportPanel.tsx # Export functionality
│   └── Header.tsx      # App header
├── store/              # State management
│   └── paletteStore.ts # Zustand store
├── types/              # TypeScript definitions
│   └── color.ts        # Color-related types
├── utils/              # Utility functions
│   └── colorUtils.ts   # Color algorithms
└── App.tsx             # Main application

```

### Key Features Implementation

- **Color Generation**: Uses Colord library for accurate color science
- **State Management**: Zustand with localStorage persistence
- **Export System**: Multiple format support with real-time preview
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized with React 19 and Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Credits

Built with modern web technologies and design principles for the developer community.
