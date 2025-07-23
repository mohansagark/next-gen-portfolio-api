import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ResponseFormatter } from '../common/response';
import { asyncHandler } from '../common/errorHandler';
import { validateEmail } from '../common/utils';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;

    // Validate input
    if (!email || !username || !password) {
      res.status(400).json(
        ResponseFormatter.badRequest('Email, username, and password are required')
      );
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json(
        ResponseFormatter.badRequest('Invalid email format')
      );
      return;
    }

    if (password.length < 6) {
      res.status(400).json(
        ResponseFormatter.badRequest('Password must be at least 6 characters long')
      );
      return;
    }

    try {
      const result = await this.authService.register({
        email,
        username,
        password,
      });

      res.status(201).json(
        ResponseFormatter.created(result, 'User registered successfully')
      );
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        res.status(409).json(
          ResponseFormatter.conflict(error.message)
        );
        return;
      }
      throw error;
    }
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json(
        ResponseFormatter.badRequest('Email and password are required')
      );
      return;
    }

    try {
      const result = await this.authService.login(email, password);

      if (!result) {
        res.status(401).json(
          ResponseFormatter.unauthorized('Invalid email or password')
        );
        return;
      }

      res.status(200).json(
        ResponseFormatter.success(result, 'Login successful')
      );
    } catch (error: any) {
      res.status(401).json(
        ResponseFormatter.unauthorized('Invalid email or password')
      );
    }
  });

  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json(
        ResponseFormatter.badRequest('Refresh token is required')
      );
      return;
    }

    try {
      const result = await this.authService.refreshToken(refreshToken);

      if (!result) {
        res.status(401).json(
          ResponseFormatter.unauthorized('Invalid refresh token')
        );
        return;
      }

      res.status(200).json(
        ResponseFormatter.success(result, 'Token refreshed successfully')
      );
    } catch (error: any) {
      res.status(401).json(
        ResponseFormatter.unauthorized('Invalid refresh token')
      );
    }
  });

  getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // User info is attached by auth middleware
    const user = (req as any).user;

    res.status(200).json(
      ResponseFormatter.success(
        {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        'Profile retrieved successfully'
      )
    );
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // In a more sophisticated implementation, you would invalidate the token
    // For now, we just return success (client should remove the token)
    res.status(200).json(
      ResponseFormatter.success(null, 'Logout successful')
    );
  });
}
