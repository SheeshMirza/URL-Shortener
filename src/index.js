const express = require("express");
const mongoose = require("mongoose");

const CONFIG = require("./config");

const redisClient = require("../src/services/cache/cacheClient").redisClient;
const utils = require("./utils/utils");

const requestErrorHandler = require("./middlewares/common/requestErrorHandler");
const requestLogger = require("./middlewares/common/requestLogger");
const router = require("./routes/router");

// Initialize Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(requestErrorHandler);
app.use(requestLogger);
app.use("/", router);

// Start the server
const server = app.listen(CONFIG.SERVER_PORT, () => {
  utils.logger.log(
    "server-listener",
    `server started at ${CONFIG.SERVER_PROTOCOL}://${CONFIG.SERVER_HOST}:${CONFIG.SERVER_PORT}`
  );
});

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${CONFIG.MONGODB_ROOT_USER}:${CONFIG.MONGODB_ROOT_PASS}@${CONFIG.MONGODB_HOST}:${CONFIG.MONGODB_PORT}/`,
      {
        dbName: CONFIG.MONGODB_DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    utils.logger.log("database-connection", "database connected");
  } catch (error) {
    utils.logger.error("database-connection", error.message);
    shutdownServer();
  }
};

// Connect to Redis
const connectToRedis = async () => {
  try {
    await redisClient.connect();
    utils.logger.log("redis-connection", "redis connected");
  } catch (error) {
    utils.logger.error("redis-connection", error.message);
    shutdownServer();
  }
};

// Shutdown server
const shutdownServer = () => {
  server.close(() => {
    process.exit(1);
  });
};

// Connect to MongoDB and Redis
const initializeConnections = async () => {
  await Promise.all([connectToMongoDB(), connectToRedis()]);
};

// Initialize connections and start server
initializeConnections()
  .then(() => {
    // Everything is initialized, nothing to do here
  })
  .catch((error) => {
    utils.logger.error("initialization", error.message);
    shutdownServer();
  });

module.exports = app; // export app for testing purposes
