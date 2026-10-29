import { getSystemHealth } from '../services/health.service.js';
import { sendResponse } from '../utils/apiResponse.js';

export const checkHealth = (req, res, next) => {
  try {
    const healthData = getSystemHealth();
    return sendResponse(res, 200, {
      success: true,
      message: 'Vault-X API is operational',
      environment: healthData.environment,
      database: healthData.database,
      timestamp: healthData.timestamp,
    });
  } catch (error) {
    next(error);
  }
};
