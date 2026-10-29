import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/auth/register - Register a new user (account creation for testing)
router.post('/register', register);

// POST /api/auth/login - User authentication with rate limiting & HttpOnly cookie
router.post('/login', loginRateLimiter, login);

// POST /api/auth/logout - Clear session cookie
router.post('/logout', logout);

// GET /api/auth/me - Retrieve authenticated user profile
router.get('/me', authenticateUser, getMe);

export default router;
