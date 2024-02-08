const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
const dotenvConfig = dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Check if environment variables are loaded successfully
if (dotenvConfig.error) {
  console.error("error loading .env file:", dotenvConfig.error.message);
}

// Validate required environment variables
const validateEnvVariable = (variableName) => {
  if (!process.env[variableName]) {
    console.error(`error: ${variableName} is not defined`);
    process.exit(1);
  }
};

// Validate and extract necessary environment variables
validateEnvVariable("DOMAIN");
validateEnvVariable("SERVER_PROTOCOL");
validateEnvVariable("SERVER_HOST");
validateEnvVariable("SERVER_PORT");
validateEnvVariable("SERVER_LOGS_DIR");
validateEnvVariable("MONGODB_ROOT_USER");
validateEnvVariable("MONGODB_ROOT_PASS");
validateEnvVariable("MONGODB_HOST");
validateEnvVariable("MONGODB_PORT");
validateEnvVariable("MONGODB_DB_NAME");
validateEnvVariable("REDIS_HOST");
validateEnvVariable("REDIS_PORT");

// Configuration object
const CONFIG = {
  DOMAIN: process.env.DOMAIN,
  SERVER_PROTOCOL: process.env.SERVER_PROTOCOL,
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_LOGS_DIR: process.env.SERVER_LOGS_DIR,
  MONGODB_ROOT_USER: process.env.MONGODB_ROOT_USER,
  MONGODB_ROOT_PASS: process.env.MONGODB_ROOT_PASS,
  MONGODB_HOST: process.env.MONGODB_HOST,
  MONGODB_PORT: process.env.MONGODB_PORT,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  URL_EXPIRY: 86400000 * 7, // 7 days in milliseconds
  URL_CACHE_EXPIRY: 60 * 10, // 10 minutes in seconds
  API_RATE_LIMIT: 3, // 3 requests per time limit
  API_RATE_TIME_LIMIT: 10, // 10 seconds
};

module.exports = CONFIG;
