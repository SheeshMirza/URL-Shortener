const urlFetcher = require("../../services/url/getLongUrl");
const CONFIG = require("../../config");
const utils = require("../../utils/utils");

// Controller to get the long URL for a given short code
const getLongUrl = async (request, response) => {
  try {
    const shortCode = extractShortCode(request); // extract short code from request parameters
    logRequestInfo("getLongUrl", shortCode); // log request information
    const longUrl = await fetchLongUrl(shortCode); // fetch long URL using the short code
    redirectToLongUrl(response, longUrl); // redirect to the long URL
  } catch (error) {
    logError("getLongUrl", error.message); // log error message
    redirectToDefaultUrl(response); // redirect to default URL
  }
};

// Extract short code from request parameters
const extractShortCode = (request) => request.params.shortCode;

// Log request information
const logRequestInfo = (functionName, shortCode) =>
  utils.logger.log(`${functionName}-controller`, `shortCode -> ${shortCode}`);

// Fetch long URL using the short code
const fetchLongUrl = async (shortCode) => {
  const { longUrl } = await urlFetcher.getLongUrl(shortCode);
  return longUrl;
};

// Redirect to the long URL
const redirectToLongUrl = (response, longUrl) =>
  response.status(302).redirect(longUrl);

// Log error message
const logError = (functionName, errorMessage) =>
  utils.logger.error(`${functionName}-controller`, errorMessage);

// Redirect to default URL
const redirectToDefaultUrl = (response) =>
  response.status(302).redirect(CONFIG.DOMAIN);

module.exports = {
  getLongUrl,
};
