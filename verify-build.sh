#!/bin/bash

# This script can be run locally to verify that the build process works

echo "Starting local verification of Render build script..."

# Set environment variables
export HUSKY_SKIP_INSTALL=1
export RENDER=true
export NODE_ENV=production

echo "Environment variables set:"
echo "HUSKY_SKIP_INSTALL=$HUSKY_SKIP_INSTALL"
echo "RENDER=$RENDER"
echo "NODE_ENV=$NODE_ENV"

# Run the render build script
chmod +x ./render-build.sh
./render-build.sh

# Check build status
if [ $? -ne 0 ]; then
  echo "Error: Build verification failed."
  exit 1
fi

# Check if main.js was created in dist folder
if [ ! -f "dist/src/main.js" ]; then
  echo "Error: main.js not found in dist/src directory."
  exit 1
fi

echo "Build verification completed successfully!"
echo "You can now run 'node dist/src/main.js' to start the application."

exit 0 