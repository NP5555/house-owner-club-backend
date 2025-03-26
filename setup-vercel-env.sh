#!/bin/bash

# Set project name for Vercel
PROJECT_NAME="hoc-be"
echo "🔐 Setting up environment variables for Vercel project: $PROJECT_NAME"

# Check if .env.production file exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    exit 1
fi

# Count total environment variables to set
total_vars=$(grep -v "^#" .env.production | grep "=" | wc -l | tr -d ' ')
current=0

echo "📋 Found $total_vars environment variables to add"

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
    
    # Add variable to Vercel without redirecting output
    # This will show any errors that occur
    echo "$value" | vercel env add "$name" production -p "$PROJECT_NAME"
    
    if [ $? -ne 0 ]; then
        echo "⚠️  Warning: Failed to add $name. It might already exist or there was an error."
    fi
done < .env.production

echo "✅ Environment variables setup completed!"
echo "🚀 You can now deploy your application using: vercel --prod -p $PROJECT_NAME" 