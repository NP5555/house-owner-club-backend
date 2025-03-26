# Deploying House Owner Club Backend to Vercel

This guide provides step-by-step instructions for deploying this NestJS backend application to Vercel.

## Prerequisites

- A Vercel account
- Vercel CLI installed (`npm install -g vercel`)
- Node.js (v14+) and npm/yarn installed
- Git installed

## Deployment Steps

### 1. Build the Application Locally

```bash
# Install dependencies
npm install

# Build the application
npm run build:prod
```

### 2. Set Up Vercel Configuration

The project includes a `vercel.json` file that configures the deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/src/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/src/main.js",
      "methods": [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "OPTIONS"
      ],
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  ]
}
```

### 3. Configure Environment Variables

Set up the required environment variables in Vercel:

1. Log in to your Vercel account
2. Create a new project or select your existing project
3. Go to Settings > Environment Variables
4. Add the environment variables from your `.env.production` file

Critical environment variables include:
- Database connection details
- JWT keys
- Mail settings
- Others specific to your application

### 4. Deploy Using Vercel CLI

```bash
# Login to Vercel (if not already logged in)
vercel login

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? [Select your account]
# - Link to existing project? [Select or create a project]
# - What's your project's development command? npm run start:dev
# - What's your project's build command? npm run vercel-build
# - What's your project's output directory? dist
# - Want to override the settings? No
```

For production deployment:

```bash
vercel --prod
```

### 5. Verify the Deployment

After deployment completes, Vercel will provide a URL to access your application. Verify that your API endpoints are working correctly.

## Troubleshooting

### Environment Variables

If you encounter issues with environment variables, verify they are correctly set in the Vercel dashboard. You can check which environment variables are being used by adding console logs to your app.

### Database Connection

Make sure your database is accessible from Vercel's servers. For PostgreSQL databases, ensure SSL is enabled (DB_SSL=true).

### Timeout Issues

If your API calls timeout, it might be due to the serverless function execution time limit. Consider optimizing your code or upgrading your Vercel plan for longer execution times.

### Logs

Check Vercel logs through the dashboard for any errors or issues during deployment or runtime.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/) 