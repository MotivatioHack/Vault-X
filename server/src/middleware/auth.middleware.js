import { verifyToken, COOKIE_NAME } from '../utils/token.js';
import { User } from '../models/user.model.js';
import { sendResponse } from '../utils/apiResponse.js';

export const authenticateUser = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check HttpOnly cookie first
    if (req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }
    // 2. Fallback to Authorization Bearer header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendResponse(res, 401, {
        success: false,
        message: 'Authentication required. Please sign in.',
      });
    }

    // 3. Verify JWT signature and expiration
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return sendResponse(res, 401, {
          success: false,
          message: 'Your session has expired. Please sign in again.',
        });
      }
      return sendResponse(res, 401, {
        success: false,
        message: 'Invalid session token. Authentication failed.',
      });
    }

    // 4. Verify user exists in database
    const user = await User.findById(decoded.id);
    if (!user) {
      return sendResponse(res, 401, {
        success: false,
        message: 'User session is invalid or user account does not exist.',
      });
    }

    // 5. Attach safe user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
