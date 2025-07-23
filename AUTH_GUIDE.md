# Authentication Guide

## Overview

The Portfolio API now includes JWT-based authentication to protect POST, PUT, and DELETE operations. All GET operations remain public for easy access to portfolio data.

## Authentication Flow

### 1. Register a New User

```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user-id",
      "email": "admin@portfolio.com",
      "username": "admin",
      "role": "admin"
    },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

### 2. Login

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "password123"
}
```

### 3. Access Protected Endpoints

Use the `accessToken` from login/register response:

```bash
POST /api/v1/education
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "institution": "University Name",
  "degree": "Computer Science",
  "startDate": "2020-01-01",
  "endDate": "2024-01-01",
  "description": "Bachelor's degree in Computer Science"
}
```

### 4. Refresh Token

```bash
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refreshToken>"
}
```

### 5. Get User Profile

```bash
GET /api/v1/auth/profile
Authorization: Bearer <accessToken>
```

### 6. Logout

```bash
POST /api/v1/auth/logout
Authorization: Bearer <accessToken>
```

## Protected Endpoints

The following endpoints require authentication:

- `POST /api/v1/education` - Create education record
- `PUT /api/v1/education/:id` - Update education record
- `DELETE /api/v1/education/:id` - Delete education record
- `POST /api/v1/projects` - Create project
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project
- `POST /api/v1/experience` - Create experience record
- `PUT /api/v1/experience/:id` - Update experience record
- `DELETE /api/v1/experience/:id` - Delete experience record
- `POST /api/v1/contact` - Create contact record
- `PUT /api/v1/contact/:id` - Update contact record
- `DELETE /api/v1/contact/:id` - Delete contact record

## Public Endpoints

The following endpoints remain public:

- `GET /api/v1/education` - List all education records
- `GET /api/v1/education/:id` - Get specific education record
- `GET /api/v1/projects` - List all projects
- `GET /api/v1/projects/:id` - Get specific project
- `GET /api/v1/experience` - List all experience records
- `GET /api/v1/experience/:id` - Get specific experience record
- `GET /api/v1/contact` - List all contact records
- `GET /api/v1/contact/:id` - Get specific contact record

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token is required",
  "error": "UNAUTHORIZED"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required",
  "error": "FORBIDDEN"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "User with this email already exists",
  "error": "CONFLICT"
}
```

## Environment Variables

Add these to your `.env` file:

```bash
# JWT Configuration (for production use proper secrets)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

## Notes

- All users are created with `admin` role by default
- Tokens are currently using simple encoding for development
- In production, implement proper JWT with RSA keys
- Consider implementing role-based permissions for different access levels
- The mock database doesn't persist data - integrate with PostgreSQL for production use
