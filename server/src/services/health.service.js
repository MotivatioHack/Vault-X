import { config } from '../config/environment.js';
import { getDbStatus } from '../config/db.js';

export const getSystemHealth = () => {
  return {
    status: 'operational',
    service: 'vault-x-api',
    environment: config.nodeEnv,
    database: getDbStatus(),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };
};
