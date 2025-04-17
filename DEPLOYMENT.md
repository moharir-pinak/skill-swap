# Deployment Guide

This guide will walk you through deploying the Skill Swap platform on Render.com (backend) and Vercel (frontend).

## Prerequisites

1. GitHub account
2. Render.com account
3. Vercel account
4. Gmail account (for email service)

## Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/skill-swap.git
   git push -u origin main
   ```

## Step 2: Deploy Backend (Render.com)

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: skill-swap-backend
   - Environment: Python
   - Build Command: `./build.sh`
   - Start Command: `gunicorn skillswap.wsgi:application`
5. Add environment variables:
   ```
   DEBUG=False
   SECRET_KEY=your-secret-key
   DATABASE_URL=your-postgres-url
   REDIS_URL=your-redis-url
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=your-email
   EMAIL_HOST_PASSWORD=your-app-password
   ```
6. Click "Create Web Service"

## Step 3: Set Up Database (Render.com)

1. In Render.com dashboard, click "New +"
2. Select "PostgreSQL"
3. Configure the database:
   - Name: skill-swap-db
   - Database: skillswap
   - User: your-username
   - Password: your-password
4. Copy the database URL and update your backend environment variables

## Step 4: Set Up Redis (Render.com)

1. In Render.com dashboard, click "New +"
2. Select "Redis"
3. Configure Redis:
   - Name: skill-swap-redis
4. Copy the Redis URL and update your backend environment variables

## Step 5: Deploy Frontend (Vercel)

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: dist
5. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com/api
   VITE_WS_URL=wss://your-backend-domain.onrender.com/ws
   ```
6. Click "Deploy"

## Step 6: Update CORS Settings

1. After deployment, update your backend's CORS settings:
   - Go to your backend settings on Render.com
   - Update CORS_ALLOWED_ORIGINS with your frontend domain
   - Redeploy the backend

## Step 7: Test the Deployment

1. Test user registration
2. Test user login
3. Test skill management
4. Test profile updates
5. Test password reset

## Troubleshooting

1. CORS Issues:
   - Check if CORS_ALLOWED_ORIGINS is correctly set
   - Verify frontend and backend domains

2. Database Connection:
   - Verify DATABASE_URL is correct
   - Check if the database is accessible

3. Email Issues:
   - Verify email credentials
   - Check if the email service is not blocking the connection

4. WebSocket Issues:
   - Ensure Redis is properly configured
   - Verify WebSocket URL is using wss:// in production

## Maintenance

1. Regular Updates:
   - Keep dependencies updated
   - Monitor error logs
   - Backup database regularly

2. Scaling:
   - Monitor resource usage
   - Upgrade plans as needed
   - Implement caching strategies 