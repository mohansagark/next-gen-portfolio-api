# Copilot Instructions for Portfolio API

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context
This is a modern, production-grade backend API for a portfolio website built with Node.js, TypeScript, and Express.js. The project follows a modular feature-based architecture.

## Key Technologies
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Migrations**: Flyway for SQL versioning
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS, Rate limiting
- **Deployment**: Railway, Docker

## Architecture Guidelines
- Use **modular feature-based structure** (education, projects, experience, contact)
- Each feature should have: controller, service, routes files
- Follow **controller → service → database** pattern
- Use **TypeScript interfaces** for data structures
- Implement **error handling** with try-catch and custom error classes
- Use **ResponseFormatter** for consistent API responses
- Apply **pagination** for list endpoints
- Implement **soft deletes** (isActive: false)

## Code Style
- Use **ES6+ features** and modern JavaScript/TypeScript
- Follow **async/await** pattern over promises
- Use **arrow functions** for class methods
- Apply **strong typing** with TypeScript interfaces
- Follow **RESTful API conventions**
- Use **meaningful variable and function names**
- Add **JSDoc comments** for complex functions

## Database Guidelines
- Use **Prisma** for database operations
- Follow **camelCase** for TypeScript, **snake_case** for SQL
- Include **created_at** and **updated_at** timestamps
- Use **UUIDs** for primary keys
- Implement **proper indexing** for performance
- Use **JSON columns** for flexible data (technologies, images, etc.)

## Security Best Practices
- **Validate all inputs** before processing
- **Sanitize user data** to prevent XSS
- Use **rate limiting** on all endpoints
- Implement **CORS** with specific origins
- Add **security headers** with Helmet
- **Never expose sensitive data** in responses

## Error Handling
- Use **asyncHandler** wrapper for async routes
- Implement **global error middleware**
- Return **consistent error responses**
- Log **errors with context** for debugging
- Use **appropriate HTTP status codes**

## API Response Format
Always return responses in this format:
```json
{
  "success": boolean,
  "message": string,
  "data": any,
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "totalPages": number
  }
}
```

## Common Patterns
- Use **dependency injection** in controllers
- Implement **service layer** for business logic
- Apply **repository pattern** with Prisma
- Use **middleware** for cross-cutting concerns
- Implement **health checks** for monitoring
- Add **Swagger documentation** for all endpoints

## File Naming Conventions
- Controllers: `*.controller.ts`
- Services: `*.service.ts`
- Routes: `*.routes.ts`
- Types/Interfaces: `*.types.ts` or inline interfaces
- Utils: `*.utils.ts`
- Middleware: `*.middleware.ts`

## Testing Guidelines
- Write **unit tests** for services
- Create **integration tests** for controllers
- Mock **database calls** in unit tests
- Test **error scenarios** and edge cases
- Use **meaningful test descriptions**

## Performance Considerations
- Implement **database indexing** for frequently queried fields
- Use **pagination** for large datasets
- Apply **caching** where appropriate
- Optimize **database queries** to avoid N+1 problems
- Use **connection pooling** for database connections

## Documentation Requirements
- Maintain **Swagger/OpenAPI** specification
- Add **JSDoc comments** for public methods
- Keep **README.md** updated with setup instructions
- Document **environment variables**
- Include **API usage examples**
