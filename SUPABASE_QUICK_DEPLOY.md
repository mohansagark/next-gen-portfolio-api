# 🚀 Supabase Quick Deploy

Deploy your Portfolio API with **Supabase database + Render hosting** - completely free forever!

## ⚡ 10-Minute Setup

### 1. Create Supabase Database

- Go to [supabase.com](https://supabase.com) → **New Project**
- Name: `portfolio-api-db`
- Generate strong password 🔑
- **Plan: Free** (500MB, never expires!)

### 2. Set Up Database Schema

- In Supabase dashboard → **SQL Editor**
- Copy & paste the complete schema from `SUPABASE_DEPLOYMENT.md`
- Click **Run** ✅

### 3. Get Connection String

- **Settings** → **Database** → **Connection string**
- Copy the URI: `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres`

### 4. Deploy to Render

- Go to [render.com](https://render.com) → **New Web Service**
- Connect: `mohansagark/next-gen-portfolio-api`
- **Build Command** (⚠️ Use EXACTLY as shown):
  - `./build.sh` (recommended - uses npm for memory efficiency)
  - `npm ci && npx prisma generate && npm run build` (alternative)
  - `yarn render-build` (if you want to use Yarn)
- **Start**: `node build/index.js` (simple and efficient)
- **Plan: Free**

### 5. Set Environment Variables

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NODE_ENV=production
JWT_SECRET=e38a9f7f36ab6eb3569fd986613ef52e0952d046a0b056249d37b4677918db0f
JWT_REFRESH_SECRET=684e071b3a406b6b87c91c771a3b2fdd8994e216961cf739ce24b14fc4222e3d
ALLOWED_ORIGIN=https://yourfrontenddomain.com
```

### 6. Deploy & Test!

Your API will be live at: `https://next-gen-portfolio-api.onrender.com`

```bash
# Test health
curl https://next-gen-portfolio-api.onrender.com/health

# Register admin
curl -X POST https://next-gen-portfolio-api.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","username":"admin","password":"password123"}'
```

## 🎯 Why Supabase + Render?

| Feature                    | Benefit                         |
| -------------------------- | ------------------------------- |
| **Database Never Expires** | ✅ Unlike Render's 30-day limit |
| **500MB Free Storage**     | ✅ Perfect for portfolio data   |
| **Beautiful Dashboard**    | ✅ Manage data visually         |
| **Automatic Backups**      | ✅ Your data is always safe     |
| **Real-time Ready**        | ✅ Add live features later      |
| **True PostgreSQL**        | ✅ Full SQL capabilities        |

## 🚀 Next Steps

1. **Update your frontend** to use: `https://next-gen-portfolio-api.onrender.com/api/v1`
2. **Manage data** via Supabase dashboard
3. **API Documentation**: `https://next-gen-portfolio-api.onrender.com/api-docs`
4. **Monitor usage** in both dashboards

**Done! Your portfolio API is live with a database that never expires! 🎉**

## 🔧 Troubleshooting

**"build.sh: command not found" Error?**
You used `build.sh` instead of `./build.sh` - the `./` is crucial!

**"Ran out of memory (used over 8GB)" Error?**
The build now uses npm instead of Yarn 4.x to avoid memory issues. Use: `./build.sh`

**"Required package missing from disk" Error?**
Use start command: `node build/index.js` instead of `yarn start`

**Build Options (in order of preference):**

1. **Option 1**: `./build.sh` (⚠️ Memory optimized with npm!)
2. **Option 2**: `npm ci && npx prisma generate && npm run build`
3. **Option 3**: `yarn render-build` (if you prefer Yarn)

**Still not working?**

- Double-check you're using `./build.sh` (with dot-slash), not just `build.sh`
- Use start command `node build/index.js` (simple and efficient)
- Verify your Render service is set to use the updated build command
- Try triggering a fresh deployment after changing the build command

**Need Help?** Check `SUPABASE_DEPLOYMENT.md` for detailed troubleshooting.

---

**Cost: $0/month forever | Database: Never deleted | Perfect for portfolios! 🚀**
