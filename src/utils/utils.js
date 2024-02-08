const fs = require("fs");
const path = require("path");

const CONFIG = require("../config");
const LOGS_DIR = CONFIG.SERVER_LOGS_DIR;

// Ensure logs directory exists
fs.mkdir(LOGS_DIR, { recursive: true }, (err) => {
  if (err) {
    console.error("\x1b[31m", "error creating logs directory:", err);
  }
});

// Get log file name based on current date
const getLogFileName = (date) => {
  return `server_logs_${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}.txt`;
};

// Get full log file path
const getLogFilePath = (fileName) => {
  return path.join(LOGS_DIR, fileName);
};

// Write log message to file
const writeLogToFile = (filePath, log) => {
  fs.appendFile(filePath, log + "\n", (err) => {
    if (err) {
      console.error("\x1b[31m", "error writing to log file:", err);
    }
  });
};

// Format log message
const formatLogMessage = (date, level, service, message) => {
  return `${date.toLocaleString()}, ${level} :: ${message} :: ${service}`;
};

// Logger object with log and error methods
const logger = {
  log: (service, message) => {
    const date = new Date();
    const logLevel = "log";
    const logMessage = formatLogMessage(date, logLevel, service, message);
    console.log("\x1b[32m", logMessage);
    const logFileName = getLogFileName(date);
    const logFilePath = getLogFilePath(logFileName);
    writeLogToFile(logFilePath, logMessage);
  },
  error: (service, message) => {
    const date = new Date();
    const logLevel = "err";
    const logMessage = formatLogMessage(date, logLevel, service, message);
    console.error("\x1b[31m", logMessage);
    const logFileName = getLogFileName(date);
    const logFilePath = getLogFilePath(logFileName);
    writeLogToFile(logFilePath, logMessage);
  },
};

module.exports = {
  logger,
};
