const utils = require("../../utils/utils");

// Middleware to log incoming requests
const requestLogger = async (request, response, next) => {
  logRequest(request); // Log incoming request
  next(); // Move to the next middleware
};

// Log incoming request
const logRequest = (request) => {
  const { method, path } = request;
  const logMessage = `new request -> ${method} ${path}`;
  logMsg(logMessage); // Log the request message
};

// Log message
const logMsg = (message) => utils.logger.log("requestLogger", message);

module.exports = requestLogger;
