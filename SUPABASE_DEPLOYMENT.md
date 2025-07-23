# 🚀 Supabase + Render Deployment Guide

## Why Supabase + Render?

**Perfect Free Tier Combination:**
- **Supabase**: Free PostgreSQL database (500MB, never expires!)
- **Render**: Free web hosting (750 hours/month)
- **Total Cost**: $0/month forever 🎉

## 🔥 Supabase Advantages

- **Persistent Database**: Never gets deleted (unlike Render's 30-day limit)
- **500MB Storage**: More than enough for portfolio data
- **50,000 Monthly Active Users**: Way more than you'll need
- **Real-time Features**: Built-in if you want to add live updates later
- **Dashboard**: Beautiful database management interface
- **Automatic Backups**: Your data is always safe

## 🚀 Deployment Architecture

```
Frontend (Vercel/Netlify) → Render API Server → Supabase Database
```

## 📚 Step-by-Step Setup

### Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)** and sign up
2. **Click "New Project"**
3. **Configure project**:
   - **Organization**: Create new or use existing
   - **Name**: `portfolio-api-db`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
   - **Plan**: **Free** (500MB, never expires)
4. **Click "Create new project"**
5. **Wait for setup** (takes ~2 minutes)

### Step 2: Get Database Connection

1. **In your Supabase dashboard**:
   - Go to **Settings** → **Database**
   - Scroll to **Connection string**
   - Copy the **Connection string** (URI format)
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Step 3: Set Up Database Schema

1. **Go to SQL Editor** in Supabase dashboard
2. **Run your schema creation**:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Education table
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    grade VARCHAR(50),
    description TEXT,
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies JSONB,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    category VARCHAR(100),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experience table
CREATE TABLE experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    technologies JSONB,
    achievements TEXT[],
    is_current BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact table
CREATE TABLE contact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table for authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_education_active ON education(is_active);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_experience_active ON experience(is_active);
CREATE INDEX idx_contact_status ON contact(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER set_timestamp_education BEFORE UPDATE ON education FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_projects BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_experience BEFORE UPDATE ON experience FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_contact BEFORE UPDATE ON contact FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
```

### Step 4: Deploy to Render

1. **Create Render Web Service**:
   - Go to [render.com](https://render.com)
   - **New +** → **Web Service**
   - Connect: `mohansagark/next-gen-portfolio-api`
   - **Name**: `next-gen-portfolio-api`
   - **Build Command**: `./build.sh` (or `corepack enable && yarn install && yarn build`)
   - **Start Command**: `yarn start`
   - **Plan**: **Free**

> **⚠️ Important**: This project uses Yarn 4.6.0 which requires Corepack. The `build.sh` script automatically enables Corepack. If you see Yarn version errors, make sure to use the provided build command.

2. **Set Environment Variables in Render**:
```env
# 🔴 CRITICAL - Supabase Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# 🔴 CRITICAL - JWT Secrets
JWT_SECRET=e38a9f7f36ab6eb3569fd986613ef52e0952d046a0b056249d37b4677918db0f
JWT_REFRESH_SECRET=684e071b3a406b6b87c91c771a3b2fdd8994e216961cf739ce24b14fc4222e3d

# 🔴 CRITICAL - Environment
NODE_ENV=production

# 🔴 CRITICAL - CORS (replace with your frontend domain)
ALLOWED_ORIGIN=https://yourportfolio.com

# ✅ OPTIONAL - API Settings
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
API_VERSION=v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50
```

### Step 5: Update Prisma Schema (Optional)

If you want to use Prisma with Supabase, update your connection:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Your existing models work perfectly with Supabase!
```

### Step 6: Test Your Deployment

```bash
# Replace with your actual Render URL
API_URL="https://next-gen-portfolio-api.onrender.com"

# Test health check
curl $API_URL/health

# Test registration
curl -X POST $API_URL/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yourportfolio.com","username":"admin","password":"securepassword123"}'

# Check Swagger docs
# Visit: https://next-gen-portfolio-api.onrender.com/api-docs
```

## 🎯 Supabase Dashboard Features

### Database Management
- **Table Editor**: Visual interface to manage data
- **SQL Editor**: Run custom queries
- **API Docs**: Auto-generated REST API documentation

### Monitoring
- **Usage Statistics**: Track database usage
- **Logs**: Real-time database logs
- **Performance**: Query performance insights

### Backup & Security
- **Automatic Backups**: Point-in-time recovery
- **Row Level Security**: Advanced security policies
- **API Keys**: Secure database access

## 🔒 Security Best Practices

### Supabase Security
1. **Enable Row Level Security** (if needed later)
2. **Use environment variables** for database URLs
3. **Rotate database password** periodically
4. **Monitor database usage** in dashboard

### API Security
1. **JWT tokens** for authentication
2. **Rate limiting** enabled
3. **CORS** properly configured
4. **Input validation** implemented

## 💡 Pro Tips

### Database Optimization
- **Use indexes** for frequently queried fields (already included in schema)
- **Monitor query performance** in Supabase dashboard
- **Use connection pooling** (built into Supabase)

### Development Workflow
1. **Test locally** with your Supabase database
2. **Use Supabase dashboard** to inspect data
3. **Deploy to Render** automatically on git push
4. **Monitor logs** in both Render and Supabase

### Scaling Considerations
- **Free tier limits**: 500MB storage, 50K MAU
- **Upgrade path**: $25/month for 8GB + more features
- **Connection limits**: 60 concurrent (free tier)

## 🆚 Cost Comparison

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Supabase DB** | 500MB, 50K MAU, Never expires | $25/month (8GB) |
| **Render Hosting** | 750 hours/month, Sleeps after 15min | $7/month (always on) |
| **Total** | **$0/month** | $32/month |

## 🚨 Important Notes

### Free Tier Limitations:
- **Supabase**: 500MB storage, 50,000 monthly active users
- **Render**: Sleeps after 15 minutes, 750 hours/month
- **Cold Starts**: ~10-30 seconds after sleep

### Production Considerations:
- **Database never expires** with Supabase ✅
- **Automatic backups** included ✅
- **SSL connections** enabled by default ✅
- **Real-time capabilities** available if needed ✅

## 🎉 Why This Setup is Perfect

1. **Truly Free Forever**: Database never gets deleted
2. **Production Ready**: Both services are enterprise-grade
3. **Scalable**: Easy upgrade path when you grow
4. **Modern Stack**: PostgreSQL + Node.js + TypeScript
5. **Great DX**: Excellent dashboards and tooling

---

**Supabase + Render = Perfect free hosting for your portfolio! 🚀**

## 🔧 Troubleshooting

### Yarn Version Error on Render

If you see this error:
```
error This project's package.json defines "packageManager": "yarn@4.6.0". However the current global version of Yarn is 1.22.22.
```

**Solution**: Use the correct build command that enables Corepack:
- **Build Command**: `./build.sh` 
- **Alternative**: `corepack enable && yarn install && yarn build`

### Database Connection Issues

If you get database connection errors:
1. **Check DATABASE_URL format**: Should be `postgresql://postgres:password@db.ref.supabase.co:5432/postgres`
2. **Verify Supabase project is active**: Check your Supabase dashboard
3. **Confirm password**: Make sure you're using the correct database password

### Environment Variables Not Set

Common missing variables:
- `DATABASE_URL` - Critical for database connection
- `NODE_ENV=production` - Required for production mode
- `JWT_SECRET` - Required for authentication
- `ALLOWED_ORIGIN` - Required for CORS
