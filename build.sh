#!/bin/bash

echo "🚀 Starting Portfolio API build process..."

# Check if Corepack is available
if command -v corepack &> /dev/null; then
    echo "✅ Corepack is available, enabling..."
    corepack enable
else
    echo "⚠️ Corepack not found, installing globally..."
    npm install -g corepack
    corepack enable
fi

echo "📦 Installing dependencies with Yarn 4.x..."
yarn install

echo "🔨 Building TypeScript project..."
yarn build

echo "✅ Build completed successfully!"
