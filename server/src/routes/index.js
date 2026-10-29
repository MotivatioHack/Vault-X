import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import fileRoutes from './file.routes.js';

const router = Router();

// Health check endpoint (/api/health)
router.use('/health', healthRoutes);

// Authentication endpoints (/api/auth)
router.use('/auth', authRoutes);

// File management endpoints (/api/files)
router.use('/files', fileRoutes);

export default router;
