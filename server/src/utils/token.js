import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';

export const COOKIE_NAME = 'vault_token';

/**
 * Generate a signed JWT for an authenticated user
 * @param {string} userId
 * @param {boolean} rememberMe
 * @returns {string} Signed JWT
 */
export const generateToken = (userId, rememberMe = false) => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not configured on the server');
  }

  const expiresIn = rememberMe ? '30d' : (config.jwtExpiresIn || '1d');

  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn,
  });
};

/**
 * Verify a JWT token
 * @param {string} token
 * @returns {object} Decoded token payload
 */
export const verifyToken = (token) => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not configured on the server');
  }
  return jwt.verify(token, config.jwtSecret);
};

/**
 * Get standard cookie options for local dev vs production
 * @param {boolean} rememberMe
 * @returns {object} Express cookie options
 */
export const getCookieOptions = (rememberMe = false) => {
  const isProduction = config.nodeEnv === 'production';
  const durationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

  return {
    httpOnly: true, // Prevents client-side JS from reading cookie
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'none' : 'lax', // Local development friendly
    maxAge: durationMs,
    path: '/',
  };
};

/**
 * Set the authentication HttpOnly cookie on the response
 * @param {import('express').Response} res
 * @param {string} token
 * @param {boolean} rememberMe
 */
export const setAuthCookie = (res, token, rememberMe = false) => {
  res.cookie(COOKIE_NAME, token, getCookieOptions(rememberMe));
};

/**
 * Clear the authentication cookie on logout
 * @param {import('express').Response} res
 */
export const clearAuthCookie = (res) => {
  const isProduction = config.nodeEnv === 'production';
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  });
};
