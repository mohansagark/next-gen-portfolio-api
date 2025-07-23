# Portfolio API 🚀

Modern, production-grade backend API for portfolio website with modular architecture, comprehensive CRUD operations, Swagger documentation, and easy Railway deployment.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Authentication](#authentication)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Docker Deployment](#docker-deployment)
- [Railway Deployment](#railway-deployment)
- [Development](#development)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Modular Architecture**: Feature-based folder structure for scalability
- **JWT Authentication**: Secure token-based authentication for admin operations
- **Full CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Protected Endpoints**: Admin-only access for POST, PUT, DELETE operations
- **Public Read Access**: All GET endpoints remain publicly accessible
- **Swagger Documentation**: Interactive API documentation at `/api-docs`
- **Database Management**: Prisma ORM + Flyway SQL migrations
- **Security**: Helmet, CORS, rate limiting, input sanitization
- **Docker Support**: Full containerization with Docker Compose
- **Railway Ready**: One-click deployment to Railway
- **TypeScript**: Full type safety and IntelliSense support
- **Error Handling**: Comprehensive error handling and logging
- **Health Checks**: Built-in health monitoring endpoints
- **Pagination**: Efficient data pagination for all endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Migrations**: Flyway for versioned SQL migrations
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, express-rate-limit
- **Package Manager**: Yarn
- **Deployment**: Railway, Docker
- **Development**: ESLint, Prettier, ts-node-dev

## 📁 Project Structure

```
src/
├── auth/             # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.middleware.ts
│   └── auth.routes.ts
├── common/           # Shared utilities and middleware
│   ├── database.ts   # Prisma client configuration
│   ├── errorHandler.ts # Global error handling
│   ├── response.ts   # Response formatting utilities
│   └── utils.ts      # Common utility functions
├── education/        # Education module
│   ├── education.controller.ts
│   ├── education.service.ts
│   └── education.routes.ts
├── projects/         # Projects module
│   ├── project.controller.ts
│   ├── project.service.ts
│   └── project.routes.ts
├── experience/       # Experience module
│   ├── experience.controller.ts
│   ├── experience.service.ts
│   └── experience.routes.ts
├── contact/          # Contact module
│   ├── contact.controller.ts
│   ├── contact.service.ts
│   └── contact.routes.ts
├── docs/
│   └── swagger.yaml  # OpenAPI 3.0 specification
├── db/
│   ├── prisma/
│   │   └── schema.prisma
│   └── flyway/
│       └── migrations/
│           └── V1__init.sql
└── index.ts          # Application entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-api.git
   cd portfolio-api
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   yarn prisma:generate
   
   # Run Flyway migrations
   yarn migrate
   ```

5. **Start development server**
   ```bash
   yarn dev
   ```

The API will be available at `http://localhost:3000`

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# Server
PORT=3000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Security
ALLOWED_ORIGIN="https://devmohan.in"

# API
API_VERSION="v1"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## � Authentication

The API implements JWT-based authentication to protect POST, PUT, and DELETE operations while keeping all GET endpoints public.

### Key Features
- **Public Read Access**: All GET endpoints are accessible without authentication
- **Protected Write Operations**: POST, PUT, DELETE require admin authentication
- **JWT Tokens**: Secure token-based authentication with refresh capability
- **Role-Based Access**: Admin role required for all protected operations

### Quick Start
1. **Register an admin user**
   ```bash
   curl -X POST http://localhost:3000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@portfolio.com","username":"admin","password":"password123"}'
   ```

2. **Use the access token for protected operations**
   ```bash
   curl -X POST http://localhost:3000/api/v1/education \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <your-access-token>" \
     -d '{"institution":"University","degree":"Computer Science",...}'
   ```

For detailed authentication guide, see [AUTH_GUIDE.md](./AUTH_GUIDE.md).

## �🗄️ Database Setup

### Using Prisma

1. **Generate Prisma client**
   ```bash
   yarn prisma:generate
   ```

2. **View database in Prisma Studio**
   ```bash
   yarn prisma:studio
   ```

### Using Flyway

1. **Run migrations**
   ```bash
   yarn migrate
   ```

2. **Check migration status**
   ```bash
   flyway info
   ```

## 📚 API Documentation

Interactive Swagger documentation is available at:
- Development: `http://localhost:3000/api-docs`
- Production: `https://your-domain.com/api-docs`

### Generate Swagger JSON
```bash
yarn swagger
```

## 🐳 Docker Deployment

### Build and run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f portfolio-api

# Stop services
docker-compose down
```

### Individual Docker commands

```bash
# Build image
docker build -t portfolio-api .

# Run container
docker run -p 3000:3000 --env-file .env portfolio-api
```

## 🚂 Railway Deployment

### Automatic Deployment

1. **Connect your GitHub repository to Railway**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy
railway up
```

### Required Railway Environment Variables

```
DATABASE_URL=postgresql://...
ALLOWED_ORIGIN=https://devmohan.in
PORT=3000
NODE_ENV=production
```

## 💻 Development

### Available Scripts

```bash
# Development
yarn dev              # Start development server with hot reload
yarn build            # Build TypeScript to JavaScript
yarn start            # Start production server

# Database
yarn prisma:generate  # Generate Prisma client
yarn prisma:studio    # Open Prisma Studio
yarn migrate          # Run Flyway migrations

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint errors
yarn format           # Format code with Prettier

# Documentation
yarn swagger          # Generate Swagger JSON
```

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and test**
   ```bash
   yarn dev
   # Test your changes
   ```

3. **Run linting and formatting**
   ```bash
   yarn lint:fix
   yarn format
   ```

4. **Build and test**
   ```bash
   yarn build
   yarn start
   ```

## 🔗 API Endpoints

### Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `https://your-railway-app.railway.app/api/v1`

### General Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger documentation |

### Authentication 🔐

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |
| GET | `/api/v1/auth/profile` | Get user profile | Yes |
| POST | `/api/v1/auth/logout` | Logout user | Yes |

### Education 📚

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/education` | Get all education records | No |
| GET | `/api/v1/education/:id` | Get education by ID | No |
| POST | `/api/v1/education` | Create education record | Yes (Admin) |
| PUT | `/api/v1/education/:id` | Update education record | Yes (Admin) |
| DELETE | `/api/v1/education/:id` | Delete education record | Yes (Admin) |

### Projects 💼

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/projects` | Get all projects | No |
| GET | `/api/v1/projects/:id` | Get project by ID | No |
| POST | `/api/v1/projects` | Create project | Yes (Admin) |
| PUT | `/api/v1/projects/:id` | Update project | Yes (Admin) |
| DELETE | `/api/v1/projects/:id` | Delete project | Yes (Admin) |

### Experience 💼

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/experience` | Get all experience records | No |
| GET | `/api/v1/experience/:id` | Get experience by ID | No |
| POST | `/api/v1/experience` | Create experience record | Yes (Admin) |
| PUT | `/api/v1/experience/:id` | Update experience record | Yes (Admin) |
| DELETE | `/api/v1/experience/:id` | Delete experience record | Yes (Admin) |

### Contact 💬

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/contact` | Get all contact messages | No |
| GET | `/api/v1/contact/:id` | Get contact by ID | No |
| POST | `/api/v1/contact` | Create contact message | Yes (Admin) |
| PUT | `/api/v1/contact/:id` | Update contact status | Yes (Admin) |
| DELETE | `/api/v1/contact/:id` | Delete contact message | Yes (Admin) |

> **Note**: Only GET operations are publicly accessible. All POST, PUT, and DELETE operations require admin authentication.

### Authentication Headers

For protected endpoints, include the access token in the Authorization header:

```bash
Authorization: Bearer <your-access-token>
```

### Query Parameters

All GET endpoints support pagination:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

Additional filters:
- **Projects**: `featured=true`, `category=web`
- **Contact**: `status=unread`

### Response Format

All endpoints return consistent JSON responses:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [Flyway](https://flywaydb.org/) - Version control for your database
- [Railway](https://railway.app/) - Deploy instantly from GitHub
- [Swagger](https://swagger.io/) - API documentation

---

**Made with ❤️ by [Mohan Sagar](https://devmohan.in)**
