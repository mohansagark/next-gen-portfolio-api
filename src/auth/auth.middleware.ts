import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { ResponseFormatter } from '../common/response';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Middleware to verify JWT token and authenticate user
   */
  authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = (req as Request).headers.authorization;

      if (!authHeader) {
        res.status(401).json(
          ResponseFormatter.unauthorized('Access token is required')
        );
        return;
      }

      const token = authHeader.split(' ')[1]; // Bearer <token>

      if (!token) {
        res.status(401).json(
          ResponseFormatter.unauthorized('Access token is required')
        );
        return;
      }

      const user = await this.authService.verifyToken(token);

      if (!user) {
        res.status(401).json(
          ResponseFormatter.unauthorized('Invalid or expired token')
        );
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json(
        ResponseFormatter.unauthorized('Invalid or expired token')
      );
    }
  };

  /**
   * Middleware to check if user has admin role
   */
  requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json(
        ResponseFormatter.unauthorized('Authentication required')
      );
      return;
    }

    if (req.user.role !== 'admin') {
      res.status(403).json(
        ResponseFormatter.forbidden('Admin access required')
      );
      return;
    }

    next();
  };

  /**
   * Optional authentication middleware - doesn't fail if no token provided
   */
  optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = (req as Request).headers.authorization;

      if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
          const user = await this.authService.verifyToken(token);
          if (user) {
            req.user = user;
          }
        }
      }

      next();
    } catch (error) {
      // Ignore errors in optional auth
      next();
    }
  };
}
