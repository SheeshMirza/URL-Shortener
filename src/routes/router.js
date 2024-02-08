const express = require("express");
const router = express.Router();

const rateLimiter = require("../middlewares/rateLimiter");
const resourceError = require("../controllers/common/resourceError");

const { createShortUrl } = require("../controllers/url/create");
const { getLongUrl } = require("../controllers/url/get");

// Route to get long URL based on short code
router.get("/:shortCode", rateLimiter, getLongUrl); // Route to get long URL based on short code

// Route to create a short URL
router.post("/api/url", rateLimiter, createShortUrl); // Handle POST requests for creating short URLs

// Fallback route for handling all other requests
router.all("/**", rateLimiter, resourceError); // Fallback route for handling all other requests

module.exports = router;
