#!/bin/bash

# Portfolio API Startup Script
echo "🚀 Starting Portfolio API setup..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📋 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    yarn install
fi

# Generate Prisma client (if possible)
echo "🗄️  Attempting to generate Prisma client..."
yarn prisma:generate || echo "⚠️  Prisma client generation failed. Using mock database."

# Build the project
echo "🔨 Building TypeScript..."
yarn build

# Start the development server
echo "🌟 Starting development server..."
yarn dev
