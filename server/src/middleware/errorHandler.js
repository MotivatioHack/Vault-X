import { sendResponse } from '../utils/apiResponse.js';
import { config } from '../config/environment.js';

/**
 * Handle 404 Not Found for unmatched endpoints
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Resource not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Centralized error handling middleware
 */
export const centralErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  const responsePayload = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };

  if (config.nodeEnv === 'development' && err.stack) {
    responsePayload.stack = err.stack;
  }

  sendResponse(res, statusCode, responsePayload);
};
