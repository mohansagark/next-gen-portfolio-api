import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import path from 'path';

import { errorHandler, notFoundHandler } from './common/errorHandler';
import { ResponseFormatter } from './common/response';
import { educationRoutes } from './education/education.routes';
import { projectRoutes } from './projects/project.routes';
import { experienceRoutes } from './experience/experience.routes';
import { contactRoutes } from './contact/contact.routes';
import { authRoutes } from './auth/auth.routes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins: (string | RegExp)[] = [
  process.env.ALLOWED_ORIGIN || 'https://devmohan.in',
  'https://next-gen-portfolio-api.onrender.com', // Allow Swagger UI
];

// Add localhost for development (all ports)
if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push(
    /^http:\/\/localhost:\d+$/,
    /^http:\/\/127\.0\.0\.1:\d+$/
  );
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      const isAllowed = allowedOrigins.some(allowedOrigin => {
        if (typeof allowedOrigin === 'string') {
          return allowedOrigin === origin;
        }
        return allowedOrigin.test(origin);
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Rate limiting
const rateLimitOptions = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: ResponseFormatter.error(
    'Too many requests from this IP, please try again later.'
  ),
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(rateLimitOptions);

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json(
    ResponseFormatter.success(
      {
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: API_VERSION,
      },
      'Service is healthy'
    )
  );
});

// API Documentation
try {
  const swaggerDocument = YAML.load(
    path.join(__dirname, 'docs', 'swagger.yaml')
  );
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Portfolio API Documentation',
    })
  );
} catch (error) {
  console.error('Failed to load Swagger documentation:', error);
}

// API Routes
const apiRouter = express.Router();

// Welcome endpoint
apiRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(
    ResponseFormatter.success(
      {
        name: 'Portfolio API',
        version: API_VERSION,
        description: 'Modern backend API for portfolio website',
        documentation: '/api-docs',
        endpoints: {
          auth: `/api/${API_VERSION}/auth`,
          education: `/api/${API_VERSION}/education`,
          projects: `/api/${API_VERSION}/projects`,
          experience: `/api/${API_VERSION}/experience`,
          contact: `/api/${API_VERSION}/contact`,
        },
      },
      'Welcome to Portfolio API'
    )
  );
});

// Feature routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/education', educationRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/experience', experienceRoutes);
apiRouter.use('/contact', contactRoutes);

// Mount API routes
app.use(`/api/${API_VERSION}`, apiRouter);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Portfolio API server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api/${API_VERSION}`);
  console.log(`🌟 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
