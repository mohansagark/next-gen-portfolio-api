# Database Setup Guide

## Quick Start with Docker

If you have Docker installed, you can quickly start a PostgreSQL database:

```bash
# Start PostgreSQL with Docker
docker run --name portfolio-postgres \
  -e POSTGRES_DB=portfolio_db \
  -e POSTGRES_USER=portfolio_user \
  -e POSTGRES_PASSWORD=portfolio_password \
  -p 5432:5432 \
  -d postgres:15-alpine

# Check if it's running
docker ps
```

Update your `.env` file:
```env
DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db"
```

## Alternative: Use Railway PostgreSQL

1. Sign up at [Railway](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string to your `.env` file

## Generate Prisma Client

Once your database is set up:

```bash
# Generate Prisma client
yarn prisma:generate

# Push schema to database (for development)
yarn prisma db push

# Or run migrations (for production)
yarn migrate
```

## Verify Setup

```bash
# Start the development server
yarn dev

# Check health endpoint
curl http://localhost:3000/health
```

The API will be available at `http://localhost:3000` and documentation at `http://localhost:3000/api-docs`.
