const urlCreator = require("../../services/url/createShortUrl");
const utils = require("../../utils/utils");

// Controller to create a short URL
const createShortUrl = async (request, response) => {
  try {
    const { longUrl } = request.body; // extract long URL from request body
    const { qrCode } = request.query; // extract QR code flag from query parameters
    logControllerInfo(
      "createShortUrl",
      `longUrl: ${longUrl}, qrCode: ${qrCode}`
    ); // log controller information
    const shortUrl = await urlCreator.createShortUrl(longUrl, qrCode); // create short URL
    logControllerInfo(
      "createShortUrl",
      `created short URL: ${shortUrl.shortUrl}`
    ); // log success message
    sendSuccessResponse(response, 201, "success", shortUrl); // send success response
  } catch (error) {
    logControllerError("createShortUrl", error.message); // log error message
    sendErrorResponse(response, 400, error.message); // send error response
  }
};

// Log controller information
const logControllerInfo = (controllerName, message) =>
  utils.logger.log(`${controllerName}-controller`, message);

// Log controller error
const logControllerError = (controllerName, errorMessage) =>
  utils.logger.error(`${controllerName}-controller`, errorMessage);

// Send success response
const sendSuccessResponse = (response, statusCode, message, data) =>
  response
    .status(statusCode)
    .json({ success: true, message: message, shortUrl: data });

// Send error response
const sendErrorResponse = (response, statusCode, message) =>
  response
    .status(statusCode)
    .json({ success: false, message: message, shortUrl: null });

module.exports = {
  createShortUrl,
};
