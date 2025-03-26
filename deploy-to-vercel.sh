#!/bin/bash

# Exit on any error
set -e

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Please install it using 'npm i -g vercel'"
    exit 1
fi

# Check if user is logged in to Vercel
vercel whoami &> /dev/null || (echo "Please login to Vercel using 'vercel login'" && exit 1)

# Set project name for Vercel
PROJECT_NAME="hoc-be"
echo "🚀 Deploying to Vercel project: $PROJECT_NAME"

# Build the application first
echo "📦 Building the application..."
npm run build:prod

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

echo "✅ Build completed successfully!"

# Function to handle environment variables
setup_env_vars() {
    echo "🔐 Setting up environment variables..."
    
    if [ ! -f .env.production ]; then
        echo "❌ Error: .env.production file not found!"
        return 1
    fi
    
    # Count total environment variables to set
    total_vars=$(grep -v "^#" .env.production | grep "=" | wc -l | tr -d ' ')
    current=0
    
    # Read .env.production file line by line
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip empty lines and comments
        if [[ -z "$line" || "$line" =~ ^# ]]; then
            continue
        fi
        
        # Extract variable name and value
        name=$(echo "$line" | cut -d= -f1)
        value=$(echo "$line" | cut -d= -f2-)
        
        # Skip if variable name is empty
        if [[ -z "$name" ]]; then
            continue
        fi
        
        # Increment counter
        ((current++))
        
        echo "⚙️  Adding environment variable ($current/$total_vars): $name"
        
        # Add variable to Vercel
        echo "$value" | vercel env add "$name" production -p "$PROJECT_NAME" > /dev/null 2>&1
        
        if [ $? -ne 0 ]; then
            echo "⚠️  Warning: Failed to add $name. It might already exist or there was an error."
        fi
    done < .env.production
    
    echo "✅ Environment variables setup completed!"
    return 0
}

# Deploy to Vercel
deploy_to_vercel() {
    echo "🚀 Deploying to Vercel production..."
    vercel --prod -p "$PROJECT_NAME"
    
    if [ $? -ne 0 ]; then
        echo "❌ Deployment failed."
        return 1
    fi
    
    echo "✅ Deployment completed successfully!"
    return 0
}

# Main script execution
echo "🔄 Starting deployment process..."

# Ask if user wants to set environment variables
read -p "Do you want to set environment variables? (y/n): " set_env
if [[ "$set_env" =~ ^[Yy]$ ]]; then
    setup_env_vars
fi

# Ask if user wants to deploy
read -p "Do you want to deploy to Vercel? (y/n): " deploy
if [[ "$deploy" =~ ^[Yy]$ ]]; then
    deploy_to_vercel
fi

echo "🎉 Deployment process completed!" 