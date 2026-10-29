import { config } from '../config/environment.js';

export const getSystemHealth = () => {
  return {
    status: 'operational',
    service: 'vault-x-api',
    environment: config.nodeEnv,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };
};
