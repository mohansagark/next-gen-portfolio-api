#!/bin/bash

echo "🚀 Starting Portfolio API build process (Memory Optimized)..."

# Use npm instead of Yarn 4.x to avoid memory issues
echo "📦 Installing dependencies with npm (memory efficient)..."
npm ci --production=false

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🔨 Building TypeScript project..."
npm run build

echo "✅ Build completed successfully!"
