import bcrypt from 'bcryptjs';
import { database } from '../common/database';

// For simple base64 encoding/decoding
declare global {
  function btoa(str: string): string;
  function atob(str: string): string;
}

export interface RegisterUserData {
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export class AuthService {
  // Simple token for development - in production you'd use proper JWT
  private generateSimpleToken(userId: string, email: string, role: string): string {
    const tokenData = {
      userId,
      email,
      role,
      timestamp: Date.now(),
    };
    // Simple encoding using base64 alternative
    return JSON.stringify(tokenData);
  }

  private verifySimpleToken(token: string): any {
    try {
      const tokenData = JSON.parse(token);
      // Check if token is not older than 24 hours
      const isValid = (Date.now() - tokenData.timestamp) < (24 * 60 * 60 * 1000);
      return isValid ? tokenData : null;
    } catch {
      return null;
    }
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterUserData): Promise<LoginResponse> {
    const { email, username, password } = userData;

    // Check if user already exists
    const existingUser = await database.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        throw new Error('User with this email already exists');
      }
      if (existingUser.username === username) {
        throw new Error('User with this username already exists');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await database.user.create({
      data: {
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
        role: 'admin', // Default role
      }
    });

    // Generate tokens
    const accessToken = this.generateSimpleToken(user.id, user.email, user.role);
    const refreshToken = this.generateSimpleToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<LoginResponse | null> {
    // Find user by email
    const user = await database.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return null;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // Generate tokens
    const accessToken = this.generateSimpleToken(user.id, user.email, user.role);
    const refreshToken = this.generateSimpleToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const decoded = this.verifySimpleToken(refreshToken);
      
      if (!decoded) {
        return null;
      }

      // Find user to ensure they still exist
      const user = await database.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        return null;
      }

      // Generate new tokens
      const newAccessToken = this.generateSimpleToken(user.id, user.email, user.role);
      const newRefreshToken = this.generateSimpleToken(user.id, user.email, user.role);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Verify token and return user info
   */
  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = this.verifySimpleToken(token);
      
      if (!decoded) {
        return null;
      }

      // Find user to ensure they still exist and get fresh data
      const user = await database.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        }
      });

      return user;
    } catch (error) {
      return null;
    }
  }
}
