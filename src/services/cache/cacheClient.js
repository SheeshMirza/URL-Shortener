const { createClient } = require("redis");
const utils = require("../../utils/utils");
const CONFIG = require("../../config");

// Create Redis client
const redisClient = createClient({
  url: `redis://${CONFIG.REDIS_HOST}:${CONFIG.REDIS_PORT}`,
  disableOfflineQueue: true,
});

// Set data in cache
const SET_CACHE = async (key, value, expirySeconds = 120, update = false) => {
  try {
    validateInput(key, value, expirySeconds); // Validate input parameters
    await redisClient.set(key, value, {
      EX: expirySeconds,
      NX: !update,
    });
  } catch (error) {
    handleError("redis-cache-set", error); // Handle errors
  }
};

// Get data from cache
const GET_CACHE = async (key) => {
  try {
    validateKey(key); // Validate cache key
    return await redisClient.get(key);
  } catch (error) {
    handleError("redis-cache-get", error); // Handle errors
  }
};

// Validate input parameters
const validateInput = (key, value, expirySeconds) => {
  if (!key || typeof key !== "string") throw new Error("invalid key");
  if (typeof value !== "string") throw new Error("invalid value");
  if (typeof expirySeconds !== "number" || expirySeconds <= 0)
    throw new Error("invalid expirySeconds");
};

// Validate cache key
const validateKey = (key) => {
  if (!key || typeof key !== "string") throw new Error("invalid key");
};

// Handle errors
const handleError = (source, error) => {
  utils.logger.error(source, error.message);
};

module.exports = {
  redisClient,
  SET_CACHE,
  GET_CACHE,
};
