const utils = require("../../utils/utils");

// Middleware to handle request errors
const requestErrorHandler = async (error, request, response, next) => {
  if (error) {
    handleRequestError(request, error); // Handle request error
    sendErrorResponse(response); // Send error response
  } else {
    next(); // Continue to the next middleware
  }
};

// Handle request error
const handleRequestError = (request, error) => {
  const { method, path } = request;
  const errorMessage = `request error -> ${method} ${path} -> ${error.message}`;
  logError(errorMessage); // Log error message
};

// Log error message
const logError = (errorMessage) =>
  utils.logger.error("requestErrorHandler", errorMessage);

// Send error response
const sendErrorResponse = (response) => {
  response.status(400).json({ success: false, message: "bad request" }); // Send response for bad request
};

module.exports = requestErrorHandler;
