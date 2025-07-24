# 🎨 Render Quick Deploy

Deploy your Portfolio API to Render's free tier in 10 minutes!

## 🚀 Super Quick Setup

### 1. Create Render Account

- Go to [render.com](https://render.com) → Sign up with GitHub

### 2. Create Database

- Dashboard → **New +** → **PostgreSQL**
- Name: `portfolio-db`
- Plan: **Free**
- **Copy the External Database URL** 📋

### 3. Create Web Service

- **New +** → **Web Service**
- Connect: `mohansagark/next-gen-portfolio-api`
- Name: `next-gen-portfolio-api`
- Build: `./build.sh`
- Start: `node build/index.js`
- Plan: **Free**

### 4. Set Environment Variables

```env
DATABASE_URL=<paste-your-database-url-here>
NODE_ENV=production
JWT_SECRET=e38a9f7f36ab6eb3569fd986613ef52e0952d046a0b056249d37b4677918db0f
JWT_REFRESH_SECRET=684e071b3a406b6b87c91c771a3b2fdd8994e216961cf739ce24b14fc4222e3d
ALLOWED_ORIGIN=https://yourfrontenddomain.com
```

### 5. Deploy!

Click **Create Web Service** → Your API will be live at:
`https://next-gen-portfolio-api.onrender.com`

## ✅ Test Your Deployment

```bash
# Health check
curl https://next-gen-portfolio-api.onrender.com/health

# Register admin
curl -X POST https://next-gen-portfolio-api.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","username":"admin","password":"password123"}'
```

## 🎯 Next Steps

1. **Update your frontend** to use: `https://next-gen-portfolio-api.onrender.com/api/v1`
2. **Set correct CORS origin** in environment variables
3. **API Documentation**: `https://next-gen-portfolio-api.onrender.com/api-docs`

**Done! Your portfolio API is live and free! 🎉**

---

**Note**: Free tier sleeps after 15min. First request after sleep takes ~30 seconds.
