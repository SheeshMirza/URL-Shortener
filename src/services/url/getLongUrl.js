const urlModel = require("../../models/url/url.model");
const redis = require("../cache/cacheClient");
const utils = require("../../utils/utils");
const CONFIG = require("../../config");

// Function to get the long URL corresponding to a short code
const getLongUrl = async (shortCode) => {
  // Validate short code
  validateShortCode(shortCode);
  // Try fetching from cache
  let longUrl = await fetchFromCache(shortCode);
  // If not found in cache, try fetching from database
  if (!longUrl) {
    longUrl = await fetchFromDatabase(shortCode);
  }
  // If long URL is found, update cache, update click counts, and return long URL
  if (longUrl) {
    await updateCache(shortCode, longUrl);
    await updateClickCounts(shortCode);
    utils.logger.log("url-service", `fetched -> ${shortCode}`);
    return { longUrl };
  }
  // If long URL is not found, throw an error
  throw new Error("longUrl not found");
};

// Validate short code
const validateShortCode = (shortCode) => {
  const invalid = new RegExp(/^api/gm).test(shortCode);
  if (!shortCode || typeof shortCode !== "string" || invalid) {
    throw new Error("invalid shortCode provided");
  }
};

// Fetch long URL from cache
const fetchFromCache = async (shortCode) => {
  const longUrl = await redis.GET_CACHE(shortCode);
  if (longUrl) {
    utils.logger.log("url-service", `found in cache -> ${shortCode}`);
  }
  return longUrl;
};

// Fetch long URL from database
const fetchFromDatabase = async (shortCode) => {
  const currentDate = new Date();
  const urlDocument = await urlModel.findOne({
    shortCode,
    expiredAt: { $gte: currentDate.getTime() },
  });
  if (urlDocument && urlDocument.longUrl) {
    utils.logger.log("url-service", `found in database -> ${shortCode}`);
    return urlDocument.longUrl;
  }
  return null;
};

// Update cache with long URL
const updateCache = async (shortCode, longUrl) => {
  await redis.SET_CACHE(shortCode, longUrl, CONFIG.URL_CACHE_EXPIRY);
};

// Update click counts for the short URL
const updateClickCounts = async (shortCode) => {
  await urlModel.updateOne({ shortCode }, { $inc: { clickedCounts: 1 } });
};

module.exports = {
  getLongUrl,
};
