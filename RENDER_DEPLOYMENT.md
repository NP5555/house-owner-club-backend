# Home Owner Club Backend Deployment on Render

## Overview

This document describes how to deploy the Home Owner Club Backend application on Render, a modern cloud platform for hosting web services, databases, and more.

## Deployment Steps

### 1. Create a Render Account

If you haven't already, sign up for a Render account at [render.com](https://render.com/).

### 2. Create a New Web Service

1. From the Render dashboard, click **New** and select **Web Service**.
2. Connect your Git repository or manual deploy.
3. Configure your service with the following settings:

#### Basic Configuration
- **Name**: Home-owner-club-backend (or your preferred name)
- **Environment**: Node
- **Region**: Choose the region closest to your users

#### Build & Deploy Settings
- **Branch**: main (or your production branch)
- **Build Command**: `npm install && npm run build:prod`
- **Start Command**: `npm run start:prod`

### 3. Environment Variables

Set up the following environment variables in the Render dashboard:

1. Go to the **Environment** tab in your Web Service
2. Add all environment variables from your `.env.production` file

### 4. Database Connection

1. If using Render's PostgreSQL database service:
   - Create a PostgreSQL database in Render
   - Note the connection details provided by Render
   - Update the database environment variables accordingly

2. If using an external database:
   - Ensure your database allows connections from Render's IP addresses
   - Set up the proper connection string in the environment variables

### 5. Deploy Your Application

1. Click **Create Web Service** (for new services) or **Manual Deploy** > **Deploy latest commit** (for existing services)
2. Wait for the build and deployment to complete

## Maintaining Your Deployment

### Running Migrations

If you need to run migrations after deployment:

1. Connect to your Render service's shell
2. Run: `npm run migration:run`

Or set up a post-deployment script in your package.json.

### Monitoring & Logs

- Monitor your application through Render's dashboard
- Check logs for any errors in the **Logs** tab

### Scaling

Adjust the service type in Render as your application traffic grows:
- Free: Basic testing
- Starter/Standard: Production workloads
- Plus/Pro: Higher performance and scaling needs

## Troubleshooting

If you encounter issues with your deployment:

1. **Build Failures**: Check the build logs for errors
2. **Runtime Errors**: Examine the service logs
3. **Database Connection Issues**: Verify your database credentials and configuration
4. **Memory Issues**: Consider upgrading your service plan if you're running out of memory

## Conclusion

Your Home Owner Club Backend is now deployed on Render! The application should be accessible at the URL provided by Render (typically `https://your-service-name.onrender.com`). 