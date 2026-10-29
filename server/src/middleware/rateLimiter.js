import rateLimit from 'express-rate-limit';

/**
 * Login rate limiter to prevent brute force attacks
 * Max 10 attempts per 15-minute window per IP
 */
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many sign-in attempts from this address. Please try again after 15 minutes.',
  },
});
