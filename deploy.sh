#!/bin/bash

# Palette Designer - GitHub Pages Deployment Script
echo "🚀 Deploying Palette Designer to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🔗 Your site will be available at: https://YOUR_USERNAME.github.io/palette-designer/"
echo ""
echo "Note: It may take a few minutes for changes to appear live."