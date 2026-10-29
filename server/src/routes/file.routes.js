import { Router } from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { sendResponse } from '../utils/apiResponse.js';

const router = Router();

/**
 * GET /api/files
 * Protected endpoint returning authenticated user's file inventory.
 * In Brick 3, the foundation is established; returns authentic empty list and quota.
 */
router.get('/', authenticateUser, (req, res) => {
  return sendResponse(res, 200, {
    success: true,
    count: 0,
    files: [],
    storageUsedBytes: 0,
    quotaBytes: 5 * 1024 * 1024 * 1024, // 5 GB Tier
    message: 'Vault file storage initialized. No files stored yet.',
  });
});

export default router;
