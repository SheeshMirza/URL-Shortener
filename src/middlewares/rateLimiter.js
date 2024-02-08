const redis = require("../services/cache/cacheClient");
const util = require("../utils/utils");
const CONFIG = require("../config");

// Middleware to limit API rate
const rateLimiter = async (request, response, next) => {
  const userIp =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;
  try {
    // Check if user IP is present
    if (!userIp) throw new Error("IP address blocked");
    let { counts, loggedAt } = await getRateLimitData(userIp);
    // Reset counts if time limit exceeded
    if (loggedAt + 1000 * CONFIG.API_RATE_TIME_LIMIT <= Date.now()) {
      counts = 0;
      loggedAt = Date.now();
    }
    // Check if rate limit exceeded
    if (CONFIG.API_RATE_LIMIT <= counts) throw new Error("rate limit exceeded");
    counts++;
    await updateRateLimitData(userIp, counts, loggedAt);
    next(); // Move to the next middleware
  } catch (error) {
    // Handle rate limit exceeded error
    handleRateLimitExceeded(userIp, error, response);
  }
};

// Get rate limit data from cache
const getRateLimitData = async (userIp) => {
  const existing = await redis.GET_CACHE(userIp);
  return existing ? JSON.parse(existing) : { counts: 0, loggedAt: Date.now() };
};

// Update rate limit data in cache
const updateRateLimitData = async (userIp, counts, loggedAt) => {
  await redis.SET_CACHE(
    userIp,
    JSON.stringify({ counts, loggedAt }),
    CONFIG.API_RATE_TIME_LIMIT,
    true
  );
};

// Handle rate limit exceeded
const handleRateLimitExceeded = (userIp, error, response) => {
  util.logger.error("apiRateLimiter", `new request with ${userIp} blocked`);
  response.status(429).json({
    success: false,
    message: error.message.toLowerCase(),
  });
};

module.exports = rateLimiter;
