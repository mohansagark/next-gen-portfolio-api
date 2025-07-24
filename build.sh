#!/bin/bash

echo "🚀 Starting memory-optimized build process..."

# Remove existing node_modules and build directories
echo "🧹 Cleaning up existing directories..."
rm -rf node_modules build

# Install dependencies using npm (memory efficient)
echo "📦 Installing dependencies with npm..."
npm ci --silent

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build TypeScript to JavaScript
echo "🔨 Building TypeScript..."
npm run build

# Copy docs folder to build directory
echo "📚 Copying documentation files..."
if [ -d "src/docs" ]; then
    cp -r src/docs build/
    echo "✅ Documentation files copied successfully"
else
    echo "⚠️  No docs folder found in src/"
fi

# Verify build output
if [ -d "build" ] && [ -f "build/index.js" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build directory created with compiled JavaScript files"
else
    echo "❌ Build failed - no build directory or index.js found"
    exit 1
fi

echo "🎉 Build process completed successfully!"
