# Updated Vercel Deployment Instructions for House Owner Club Backend

This guide provides updated instructions for deploying the House Owner Club Backend to the "hoc-be" Vercel project.

## Available Scripts

We've created several scripts to help with the deployment process:

1. **setup-vercel-env.sh** - Sets up environment variables in the Vercel project
2. **redeploy-to-vercel.sh** - Builds and deploys the application to Vercel production
3. **deploy-to-vercel.sh** - Complete deployment script with options for environment variables and deployment

## Setting Up Environment Variables

To set up all environment variables from your `.env.production` file:

```bash
./setup-vercel-env.sh
```

This script will:
- Read all variables from your `.env.production` file
- Upload them to your "hoc-be" Vercel project
- Show progress and any errors that occur

## Redeploying to Vercel

To build and redeploy the application:

```bash
./redeploy-to-vercel.sh
```

This script will:
- Build the application using the production build script
- Deploy the built application to Vercel
- Provide the URL when complete

## Complete Deployment Process

For a more interactive deployment process that lets you choose which steps to perform:

```bash
./deploy-to-vercel.sh
```

This script will:
- Ask if you want to set up environment variables
- Ask if you want to deploy to Vercel
- Execute only the steps you choose

## Manual Commands

If you prefer to run commands manually, here are the key commands:

```bash
# Build the application
npm run build:prod

# Deploy to Vercel (production)
vercel --prod -p hoc-be

# Add a single environment variable
vercel env add VARIABLE_NAME production -p hoc-be
```

## Troubleshooting

### Environment Variable Issues

If you encounter issues with environment variables:

1. Make sure you're logged in to Vercel with the correct account:
   ```bash
   vercel whoami
   ```

2. Try adding a single variable manually to check permissions:
   ```bash
   echo "value" | vercel env add TEST_VAR production -p hoc-be
   ```

3. Check if the variable already exists in the Vercel dashboard

### Deployment Issues

1. Verify your project exists and you have permission to deploy:
   ```bash
   vercel project ls
   ```

2. Try deploying with additional debug output:
   ```bash
   vercel --debug --prod -p hoc-be
   ```

3. Check the Vercel dashboard for detailed error logs

## Accessing Your Deployed Application

Your application should be available at:

https://hoc-be-np5555-naeem-ashrafs-projects.vercel.app

You can verify the deployment in the Vercel dashboard under the "hoc-be" project. 