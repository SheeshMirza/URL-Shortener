const mongoose = require("mongoose");
const UrlSchema = require("./url.schema");

// Define and export the Mongoose model for URLs
const UrlModel = mongoose.model("Urls", UrlSchema);

module.exports = UrlModel;
