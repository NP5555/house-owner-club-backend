#!/bin/bash

# Set project name for Vercel
PROJECT_NAME="hoc-be"
echo "🚀 Redeploying Vercel project: $PROJECT_NAME"

# Build the application
echo "📦 Building the application..."
npm run build:prod

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy to production
echo "🚀 Deploying to Vercel production..."
vercel --prod -p "$PROJECT_NAME"

echo "✅ Deployment completed successfully!"
echo "📝 Your application should be available at: https://hoc-be-np5555-naeem-ashrafs-projects.vercel.app" 