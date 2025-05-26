import React, { useState } from 'react';
import { Download, Copy, Check, Code, FileText, Figma } from 'lucide-react';
import { usePaletteStore } from '../store/paletteStore';
import type { Palette } from '../types/color';

interface ExportPanelProps {
  palette: Palette;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ palette }) => {
  const [activeFormat, setActiveFormat] = useState<string>('css-variables');
  const [copied, setCopied] = useState(false);
  const { exportPalette } = usePaletteStore();

  const exportFormats = [
    {
      id: 'css-variables',
      name: 'CSS Variables',
      icon: Code,
      description: 'Custom properties for modern CSS',
      extension: 'css',
    },
    {
      id: 'scss-variables',
      name: 'SCSS Variables',
      icon: Code,
      description: 'Sass/SCSS preprocessor variables',
      extension: 'scss',
    },
    {
      id: 'json',
      name: 'JSON',
      icon: FileText,
      description: 'Structured data format',
      extension: 'json',
    },
    {
      id: 'tailwind',
      name: 'Tailwind Config',
      icon: Code,
      description: 'Tailwind CSS configuration',
      extension: 'js',
    },
    {
      id: 'figma',
      name: 'Figma Tokens',
      icon: Figma,
      description: 'Design tokens for Figma',
      extension: 'json',
    },
  ];

  const generateFigmaTokens = (palette: Palette): string => {
    const tokens = {
      global: {
        color: palette.colors.reduce((acc, color) => {
          const tokenName = `${color.role}${color.variant ? `-${color.variant}` : ''}`;
          acc[tokenName] = {
            value: color.hex.toUpperCase(),
            type: "color",
            description: `${color.role} color for ${palette.name} palette`
          };
          return acc;
        }, {} as Record<string, any>)
      }
    };

    return JSON.stringify(tokens, null, 2);
  };

  const generateTailwindConfig = (palette: Palette): string => {
    const colors = palette.colors.reduce((acc, color) => {
      const name = `${color.role}${color.variant ? `-${color.variant}` : ''}`;
      acc[name] = color.hex;
      return acc;
    }, {} as Record<string, string>);

    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8).replace(/"/g, "'")}
    }
  }
}`;
  };

  const getExportContent = (format: string): string => {
    switch (format) {
      case 'figma':
        return generateFigmaTokens(palette);
      case 'tailwind':
        return generateTailwindConfig(palette);
      default:
        return exportPalette(palette, format);
    }
  };

  const handleCopy = async () => {
    const content = getExportContent(activeFormat);
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent(activeFormat);
    const format = exportFormats.find(f => f.id === activeFormat);
    const filename = `${palette.name.toLowerCase().replace(/\s+/g, '-')}.${format?.extension || 'txt'}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Export Palette</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      {/* Format Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {exportFormats.map((format) => {
          const Icon = format.icon;
          return (
            <button
              key={format.id}
              onClick={() => setActiveFormat(format.id)}
              className={`p-3 text-left rounded-lg border transition-colors ${
                activeFormat === format.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <div>
                  <div className="font-medium">{format.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{format.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preview</label>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
            {getExportContent(activeFormat)}
          </pre>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Usage Instructions</h3>
        <div className="text-sm text-blue-800 dark:text-blue-200">
          {activeFormat === 'css-variables' && (
            <p>Add these CSS variables to your stylesheet and use them like: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">color: var(--color-primary)</code></p>
          )}
          {activeFormat === 'scss-variables' && (
            <p>Import these variables in your SCSS files and use them like: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">color: $color-primary</code></p>
          )}
          {activeFormat === 'json' && (
            <p>Use this JSON data in your applications to programmatically access color values.</p>
          )}
          {activeFormat === 'tailwind' && (
            <p>Add this configuration to your tailwind.config.js file to use these colors as Tailwind utilities.</p>
          )}
          {activeFormat === 'figma' && (
            <p>Import these design tokens into Figma using a design tokens plugin to maintain consistency between design and development.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
