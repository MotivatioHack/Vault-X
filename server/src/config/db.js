import mongoose from 'mongoose';
import { config } from './environment.js';

let isConnecting = false;

/**
 * Get current database connection status
 * @returns {'connected' | 'connecting' | 'disconnected'}
 */
export const getDbStatus = () => {
  switch (mongoose.connection.readyState) {
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    default:
      return 'disconnected';
  }
};

/**
 * Connect to MongoDB Atlas (or configured MongoDB URI)
 */
export const connectDB = async () => {
  // If already connected or connecting, prevent duplicate connection attempts
  if (mongoose.connection.readyState === 1 || isConnecting) {
    return;
  }

  if (!config.mongodbUri) {
    console.warn('[Vault-X Database] Warning: MONGODB_URI is not defined in server/.env.');
    console.warn('[Vault-X Database] Database connection skipped. Please configure MONGODB_URI to enable authentication.');
    return;
  }

  isConnecting = true;

  try {
    // Sanitize logging to ensure credentials are never exposed in terminal or logs
    const sanitizedHost = config.mongodbUri.includes('@')
      ? config.mongodbUri.split('@')[1].split('/')[0]
      : 'configured host';

    console.log(`[Vault-X Database] Connecting to MongoDB (${sanitizedHost})...`);

    await mongoose.connect(config.mongodbUri, {
      dbName: 'vault-x',
      autoIndex: true, // Build unique indexes in dev
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[Vault-X Database] MongoDB successfully connected to database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`[Vault-X Database] Connection failed: ${error.message}`);
    // Do not throw fatal exit so health check can still report status clearly
  } finally {
    isConnecting = false;
  }
};

// Graceful disconnection on process termination
process.on('SIGINT', async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('[Vault-X Database] MongoDB connection closed due to app termination');
  }
});
