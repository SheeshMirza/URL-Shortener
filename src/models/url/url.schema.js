const mongoose = require("mongoose");

// Define the URL schema
const urlSchema = mongoose.Schema({
  // Short code for the URL
  shortCode: {
    type: String,
    required: true,
  },
  // Long URL
  longUrl: {
    type: String,
    required: true,
  },
  // Number of times the URL has been clicked
  clickedCounts: {
    type: Number,
    required: false,
    default: 0,
  },
  // Creation timestamp
  createdAt: {
    type: Number,
    required: false,
    default: Date.now,
  },
  // Expiry timestamp
  expiredAt: {
    type: Number,
    required: false,
    default: Date.now,
  },
});

module.exports = urlSchema;
