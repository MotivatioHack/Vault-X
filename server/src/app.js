import express from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler, centralErrorHandler } from './middleware/errorHandler.js';

const app = express();

// CORS configuration for local development frontend
app.use(
  cors({
    origin: config.clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// JSON body parser
app.use(express.json());

// API route registration
app.use('/api', apiRoutes);

// 404 handler for unknown routes
app.use(notFoundHandler);

// Centralized error handler
app.use(centralErrorHandler);

// Start server listener only if not imported in a testing environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`[Vault-X Server] Running in ${config.nodeEnv} mode`);
    console.log(`[Vault-X Server] Listening on http://localhost:${config.port}`);
    console.log(`[Vault-X Server] Health check available at http://localhost:${config.port}/api/health`);
  });
}

export default app;
