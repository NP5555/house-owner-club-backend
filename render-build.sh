#!/bin/bash

# This script is used by Render to build the application

echo "Starting Render build script..."

# Set environment variables to skip Husky installation
export HUSKY_SKIP_INSTALL=1
export RENDER=true

echo "Environment variables set:"
echo "HUSKY_SKIP_INSTALL=$HUSKY_SKIP_INSTALL"
echo "RENDER=$RENDER"

# Clean installation if node_modules exists
if [ -d "node_modules" ]; then
  echo "Cleaning existing node_modules..."
  rm -rf node_modules
fi

# Install dependencies without running prepare script
echo "Installing dependencies..."
npm ci --omit=dev --ignore-scripts

# Check installation status
if [ $? -ne 0 ]; then
  echo "Error: npm install failed"
  echo "Trying alternative installation method..."
  npm install --omit=dev --no-package-lock --ignore-scripts
  
  if [ $? -ne 0 ]; then
    echo "Error: Both installation methods failed. Exiting."
    exit 1
  fi
fi

# Then manually run the build command
echo "Building application..."
npm run build:prod

# Check build status
if [ $? -ne 0 ]; then
  echo "Error: Build failed. Exiting."
  exit 1
fi

echo "Build completed successfully!"
exit 0 