#!/bin/bash

# Deployment script for Palette Designer
echo "🎨 Building Palette Designer for deployment..."

# Build the project
npm run build

echo "✅ Build complete! Ready for deployment."
echo ""
echo "🚀 Deployment Options:"
echo ""
echo "1. Vercel (Recommended):"
echo "   npm install -g vercel"
echo "   vercel --prod"
echo ""
echo "2. Netlify:"
echo "   - Upload the 'dist' folder to https://app.netlify.com/"
echo "   - Or install Netlify CLI: npm install -g netlify-cli"
echo "   - Then run: netlify deploy --prod --dir dist"
echo ""
echo "3. GitHub Pages:"
echo "   - Push this repo to GitHub"
echo "   - Go to Settings > Pages"
echo "   - Select 'GitHub Actions' as source"
echo "   - The .github/workflows/deploy.yml will handle the rest"
echo ""
echo "📁 Build output is in the 'dist' directory"
