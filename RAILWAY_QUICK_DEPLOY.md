# 🚂 Railway Deployment - Next Steps

## ✅ GitHub Upload Complete!

Your repository is now live at: **https://github.com/mohansagark/next-gen-portfolio-api**

## 🚀 Deploy to Railway (Step-by-Step)

### Step 1: Create Railway Account & Project

1. **Go to [railway.app](https://railway.app)** and sign up/login
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**: `mohansagark/next-gen-portfolio-api`
5. **Railway will automatically detect it's a Node.js project**

### Step 2: Add PostgreSQL Database

1. **In your Railway project dashboard, click "+ New"**
2. **Select "Database" → "PostgreSQL"**
3. **Railway will automatically:**
   - Create the database
   - Generate `DATABASE_URL` environment variable
   - Connect it to your API service

### Step 3: Configure Environment Variables

**Go to your service → "Variables" tab and add these:**

```bash
# 🔴 CRITICAL - JWT Secrets (already generated for you)
JWT_SECRET=e38a9f7f36ab6eb3569fd986613ef52e0952d046a0b056249d37b4677918db0f
JWT_REFRESH_SECRET=684e071b3a406b6b87c91c771a3b2fdd8994e216961cf739ce24b14fc4222e3d

# 🔴 CRITICAL - Environment
NODE_ENV=production

# 🔴 CRITICAL - CORS (REPLACE WITH YOUR FRONTEND DOMAIN)
ALLOWED_ORIGIN=https://yourportfolio.com

# ⚠️ RECOMMENDED - Token Settings
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# ✅ OPTIONAL - API Settings
API_VERSION=v1
PORT=3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
```

### Step 4: Deploy & Test

1. **Railway will automatically build and deploy**
2. **Wait for deployment to complete (check logs)**
3. **Get your live URL**: `https://next-gen-portfolio-api-production.up.railway.app` (or similar)

### Step 5: Test Your Live API

```bash
# Replace YOUR_RAILWAY_URL with your actual Railway URL

# Test health check
curl https://YOUR_RAILWAY_URL/health

# Test API root
curl https://YOUR_RAILWAY_URL/api/v1

# Test registration
curl -X POST https://YOUR_RAILWAY_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yourportfolio.com","username":"admin","password":"securepassword123"}'

# Access API documentation
# Visit: https://YOUR_RAILWAY_URL/api-docs
```

## 🔐 Production Security Checklist

### Before Going Live:

1. **✅ JWT Secrets Set** (already provided above)
2. **⚠️ Update CORS Origin** - Replace `https://yourportfolio.com` with your actual frontend domain
3. **⚠️ Use Strong Admin Credentials** - Don't use weak passwords
4. **✅ Database Secured** (Railway handles this)
5. **✅ HTTPS Enabled** (Railway handles this)

## 🎯 Success Indicators

Your deployment is successful when:

- ✅ Health check: `https://YOUR_RAILWAY_URL/health` returns 200
- ✅ API docs: `https://YOUR_RAILWAY_URL/api-docs` loads
- ✅ API root: `https://YOUR_RAILWAY_URL/api/v1` shows endpoints
- ✅ Registration works without errors
- ✅ Protected endpoints require authentication
- ✅ Public endpoints work without authentication

## 🚨 Important Notes

1. **Replace ALLOWED_ORIGIN** with your actual frontend domain
2. **Save your Railway URL** - you'll need it for your frontend
3. **Test all endpoints** after deployment
4. **Monitor Railway logs** for any issues

---

**Ready for Railway deployment! 🚀**

Your GitHub repo: https://github.com/mohansagark/next-gen-portfolio-api
Next: Deploy to Railway following the steps above!
