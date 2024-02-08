const urlModel = require("../../models/url/url.model");
const shortCodeGenerator = require("../../utils/shortCode");
const generateQR = require("../../utils/generateQR");
const CONFIG = require("../../config");

// Function to validate URL format
const isValidUrl = (url) => {
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};

// Function to create a short URL
const createShortUrl = async (longUrl, qrCode = false) => {
  // Input validation
  if (!longUrl || typeof longUrl !== "string" || !isValidUrl(longUrl)) {
    throw new Error("Invalid longUrl provided");
  }
  // Generate short code
  const shortCode = await shortCodeGenerator();
  // Create short URL document
  const shortUrlDocument = new urlModel({
    shortCode,
    longUrl,
    expiredAt: Date.now() + CONFIG.URL_EXPIRY,
  });
  // Save short URL document
  await shortUrlDocument.save();
  // Generate short URL
  const shortUrl = `${CONFIG.DOMAIN}/${shortCode}`;
  // Generate QR code if requested
  let shortUrlQR;
  if (qrCode) {
    shortUrlQR = await generateQR(shortUrl);
  }
  return {
    shortUrl,
    shortUrlQR,
  };
};

module.exports = {
  createShortUrl,
};
