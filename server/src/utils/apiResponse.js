/**
 * Standardized API response helper
 */
export const sendResponse = (res, statusCode, { success = true, message = '', ...extraData }) => {
  return res.status(statusCode).json({
    success,
    message,
    ...extraData,
  });
};
