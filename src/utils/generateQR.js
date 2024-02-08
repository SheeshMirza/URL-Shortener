const utils = require("./utils");
const fetch = require("node-fetch");

// Configuration for QR code generation
const qrConfig = {
  type: "qr",
  size: "450x450",
  encoding: "UTF-8",
};

// Generates a QR code for the given URL
const generateQR = async (url) => {
  try {
    const googleAPI = buildGoogleAPI(url);
    const response = await fetch(googleAPI);
    handleResponse(response);
    const base64 = await encodeImage(response);
    logSuccess();
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    handleError(error);
  }
};

// Builds the Google Chart API URL for generating QR code
const buildGoogleAPI = (url) =>
  `https://chart.googleapis.com/chart?cht=${qrConfig.type}&chs=${qrConfig.size}&chl=${url}&choe=${qrConfig.encoding}`;

// Handles the response from the Google Chart API
const handleResponse = (response) => {
  if (!response.ok)
    throw new Error(`failed to generate QR code. status: ${response.status}`);
};

// Encodes the image data to base64
const encodeImage = async (response) =>
  (await response.buffer()).toString("base64");

// Logs successful QR code generation
const logSuccess = () =>
  utils.logger.log("google-qr-generator", "qr code generated successfully");

// Handles errors during QR code generation
const handleError = (error) => {
  utils.logger.error("google-qr-generator", error.message);
  throw error;
};

module.exports = generateQR;
