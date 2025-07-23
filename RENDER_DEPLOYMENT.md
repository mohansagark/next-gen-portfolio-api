# 🎨 Render Deployment Guide

## Why Render?

- **Free Tier**: 750 hours/month (enough for personal projects)
- **PostgreSQL Database**: Free tier with 1GB storage
- **Automatic HTTPS**: SSL certificates included
- **GitHub Integration**: Auto-deploy on push
- **Zero Configuration**: Detects Node.js automatically

## 🚀 Render Deployment Setup

### Step 1: Create Render Account

1. **Go to [render.com](https://render.com)** and sign up
2. **Connect your GitHub account**

### Step 2: Create PostgreSQL Database

1. **In Render dashboard, click "New +"**
2. **Select "PostgreSQL"**
3. **Configure database**:
   - **Name**: `portfolio-db`
   - **Database**: `portfolio_db`
   - **User**: `portfolio_user`
   - **Region**: Choose closest to your users
   - **Plan**: **Free** (1GB storage)
4. **Click "Create Database"**
5. **Copy the "External Database URL"** (you'll need this)

### Step 3: Create Web Service

1. **Click "New +" → "Web Service"**
2. **Connect Repository**: `mohansagark/next-gen-portfolio-api`
3. **Configure service**:
   - **Name**: `next-gen-portfolio-api`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `.` (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `yarn install && yarn build`
   - **Start Command**: `yarn start`
   - **Plan**: **Free** (512MB RAM, sleeps after 15min inactivity)

### Step 4: Set Environment Variables

In your web service settings, add these environment variables:

```bash
# 🔴 CRITICAL - Database (from Step 2)
DATABASE_URL=postgresql://portfolio_user:password@host:port/portfolio_db

# 🔴 CRITICAL - JWT Secrets
JWT_SECRET=e38a9f7f36ab6eb3569fd986613ef52e0952d046a0b056249d37b4677918db0f
JWT_REFRESH_SECRET=684e071b3a406b6b87c91c771a3b2fdd8994e216961cf739ce24b14fc4222e3d

# 🔴 CRITICAL - Environment
NODE_ENV=production

# 🔴 CRITICAL - CORS (replace with your frontend domain)
ALLOWED_ORIGIN=https://yourportfolio.com

# ⚠️ RECOMMENDED - Token Settings
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# ✅ OPTIONAL - API Settings
API_VERSION=v1
PORT=10000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
```

### Step 5: Deploy

1. **Click "Create Web Service"**
2. **Render will automatically build and deploy**
3. **Your API will be live at**: `https://next-gen-portfolio-api.onrender.com`

## 📝 Required Code Changes for Render

### 1. Update package.json Scripts

No changes needed! Your current scripts work perfectly:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  }
}
```

### 2. Port Configuration

Your code already handles dynamic ports correctly:
```typescript
const PORT = process.env.PORT || 3000;
```

Render automatically sets `PORT=10000`, which your app will use.

### 3. Health Check Endpoint

✅ Already implemented at `/health` - perfect for Render!

## 🆚 Render vs Railway Comparison

| Feature | Render (Free) | Railway (Paid) |
|---------|---------------|----------------|
| **Cost** | Free (750 hrs/month) | $5+/month |
| **Database** | PostgreSQL 1GB free | PostgreSQL paid |
| **Sleeping** | Sleeps after 15min | Always on |
| **Build Time** | ~2-3 minutes | ~1-2 minutes |
| **Custom Domains** | ✅ Free | ✅ Free |
| **Auto HTTPS** | ✅ Yes | ✅ Yes |
| **GitHub Integration** | ✅ Yes | ✅ Yes |

## 🔧 Render-Specific Configuration

### Build Settings (Auto-detected)
- **Build Command**: `yarn install && yarn build`
- **Start Command**: `yarn start`
- **Node Version**: 18+ (auto-detected from engines in package.json)

### Health Checks
Render will automatically ping your `/health` endpoint to keep the service running.

### Cold Starts
Free tier services sleep after 15 minutes of inactivity. First request after sleep takes ~10-30 seconds to wake up.

## 🚨 Important Render Notes

### Free Tier Limitations:
1. **Sleeps after 15 minutes** of no requests
2. **750 hours/month** limit (about 25 days)
3. **512MB RAM** limit
4. **Cold starts** on first request after sleep

### Database Connection:
- Use the **External Database URL** from Render PostgreSQL
- Format: `postgresql://user:password@host:port/database`

## 🎯 Production Checklist for Render

- [ ] PostgreSQL database created on Render
- [ ] Web service connected to GitHub repo
- [ ] Environment variables configured
- [ ] `DATABASE_URL` set to Render PostgreSQL URL
- [ ] `JWT_SECRET` and `JWT_REFRESH_SECRET` set
- [ ] `ALLOWED_ORIGIN` updated with your frontend domain
- [ ] `NODE_ENV=production` set
- [ ] Service deployed and accessible

## 🧪 Testing Your Render Deployment

```bash
# Replace with your actual Render URL
RENDER_URL="https://next-gen-portfolio-api.onrender.com"

# Test health check
curl $RENDER_URL/health

# Test API root
curl $RENDER_URL/api/v1

# Test registration
curl -X POST $RENDER_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yourportfolio.com","username":"admin","password":"securepassword123"}'

# Access API documentation
# Visit: https://next-gen-portfolio-api.onrender.com/api-docs
```

---

**Render deployment is more cost-effective and perfect for portfolio projects! 🎨**
