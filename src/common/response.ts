export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class ResponseFormatter {
  static success<T>(
    data: T,
    message: string = 'Operation successful',
    pagination?: ApiResponse<T>['pagination']
  ): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      ...(pagination && { pagination }),
    };
  }

  static error(
    message: string = 'Operation failed',
    error?: string
  ): ApiResponse {
    return {
      success: false,
      message,
      ...(error && { error }),
    };
  }

  static created<T>(
    data: T,
    message: string = 'Resource created successfully'
  ): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  static updated<T>(
    data: T,
    message: string = 'Resource updated successfully'
  ): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  static deleted(message: string = 'Resource deleted successfully'): ApiResponse {
    return {
      success: true,
      message,
    };
  }

  static notFound(message: string = 'Resource not found'): ApiResponse {
    return {
      success: false,
      message,
      error: 'NOT_FOUND',
    };
  }

  static badRequest(message: string = 'Bad request'): ApiResponse {
    return {
      success: false,
      message,
      error: 'BAD_REQUEST',
    };
  }

  static unauthorized(message: string = 'Unauthorized'): ApiResponse {
    return {
      success: false,
      message,
      error: 'UNAUTHORIZED',
    };
  }

  static forbidden(message: string = 'Forbidden'): ApiResponse {
    return {
      success: false,
      message,
      error: 'FORBIDDEN',
    };
  }

  static conflict(message: string = 'Resource conflict'): ApiResponse {
    return {
      success: false,
      message,
      error: 'CONFLICT',
    };
  }

  static internalError(
    message: string = 'Internal server error'
  ): ApiResponse {
    return {
      success: false,
      message,
      error: 'INTERNAL_ERROR',
    };
  }
}
