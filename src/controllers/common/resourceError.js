const utils = require("../../utils/utils");

// Handle resource not found error
const handleResourceNotFoundError = (response) => {
  // Log error and send response
  const errorMessage = "resource not found";
  const errorCode = "404-error";
  logError(errorCode, errorMessage); // log error message
  sendErrorResponse(response, 404, errorMessage); // send error response
};

// Log error message
const logError = (errorCode, errorMessage) =>
  utils.logger.error(errorCode, errorMessage);

// Send error response
const sendErrorResponse = (response, statusCode, message) => {
  // Define response data
  const responseData = {
    status: "error",
    message: message,
  };
  response.status(statusCode).json(responseData); // send JSON response
};

module.exports = handleResourceNotFoundError;
