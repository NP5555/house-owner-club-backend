#!/bin/bash

# Check if .env.production file exists
if [ ! -f .env.production ]; then
    echo "Error: .env.production file not found!"
    exit 1
fi

# Set the Vercel project name
PROJECT_NAME="hoc-be"
echo "Using Vercel project: $PROJECT_NAME"

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

    echo "Adding $name to Vercel environment variables..."
    
    # Add variable to Vercel without using --yes flag
    echo "$value" | vercel env add "$name" production -p "$PROJECT_NAME"
done < .env.production

echo "All environment variables have been added to Vercel!"
echo "Note: You may need to redeploy your application for the changes to take effect."
echo "Run 'vercel --prod -p $PROJECT_NAME' to deploy to production." 