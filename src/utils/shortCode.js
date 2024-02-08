const urlModel = require("../models/url/url.model");

// Generates a unique short code for URLs
const generateShortCode = async () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortCode;
  let isUnique = false;
  // Keep generating short codes until a unique one is found
  while (!isUnique) {
    shortCode = "";
    for (let i = 0; i < 6; i++) {
      shortCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // Check if the generated short code already exists in the database
    const existingUrl = await urlModel.findOne({
      $or: [{ shortCode }, { expiredAt: { $lte: Date.now() } }],
    });
    if (!existingUrl) {
      isUnique = true;
    }
    // Check if the generated short code contains api*
    const invalid = new RegExp(/^api/gm).test(shortCode);
    if (invalid) {
      isUnique = false;
    }
  }
  return shortCode;
};

module.exports = generateShortCode;
