import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateToken, setAuthCookie, clearAuthCookie } from '../utils/token.js';
import { sendResponse } from '../utils/apiResponse.js';
import { getDbStatus } from '../config/db.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Register a new user account (POST /api/auth/register)
 */
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check database connectivity
    if (getDbStatus() !== 'connected') {
      return sendResponse(res, 503, {
        success: false,
        message: 'Database connection is unavailable. Please verify MONGODB_URI in server/.env.',
      });
    }

    // 2. Validate input presence
    if (!email || !password) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Email address and master password are required.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 3. Validate email format
    if (!emailRegex.test(normalizedEmail)) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // 4. Validate password policy (minimum 8 characters)
    if (typeof password !== 'string' || password.length < 8) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Master password must be at least 8 characters in length.',
      });
    }

    // 5. Check duplicate email
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return sendResponse(res, 409, {
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    // 6. Hash password using bcrypt (work factor 12)
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 7. Persist user to MongoDB
    const newUser = await User.create({
      email: normalizedEmail,
      passwordHash,
    });

    return sendResponse(res, 201, {
      success: true,
      message: 'Account registered successfully.',
      user: newUser.toJSON(),
    });
  } catch (error) {
    // Handle MongoDB duplicate key error (E11000) gracefully
    if (error.code === 11000) {
      return sendResponse(res, 409, {
        success: false,
        message: 'An account with this email address already exists.',
      });
    }
    next(error);
  }
};

/**
 * Sign in user (POST /api/auth/login)
 */
export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    // 1. Check database connectivity
    if (getDbStatus() !== 'connected') {
      return sendResponse(res, 503, {
        success: false,
        message: 'Database connection is unavailable. Please verify MONGODB_URI in server/.env.',
      });
    }

    // 2. Validate input presence
    if (!email || !password) {
      return sendResponse(res, 400, {
        success: false,
        message: 'Email address and master password are required.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 3. Find user by normalized email (explicitly selecting passwordHash)
    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

    // 4. Constant-time verification or generic invalid credentials
    if (!user) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Invalid email or master password.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Invalid email or master password.',
      });
    }

    // 5. Generate signed JWT & set HttpOnly cookie
    const token = generateToken(user._id.toString(), !!rememberMe);
    setAuthCookie(res, token, !!rememberMe);

    return sendResponse(res, 200, {
      success: true,
      message: 'Signed in successfully.',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Sign out user (POST /api/auth/logout)
 */
export const logout = (req, res) => {
  clearAuthCookie(res);
  return sendResponse(res, 200, {
    success: true,
    message: 'Signed out successfully.',
  });
};

/**
 * Get current authenticated user profile (GET /api/auth/me)
 */
export const getMe = (req, res) => {
  return sendResponse(res, 200, {
    success: true,
    user: req.user.toJSON(),
  });
};
