// models/Certificate.js
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  name: String,
  course: String,
  issuedDate: Date,
  certificateId: String
});

module.exports = mongoose.model("Certificate", certificateSchema);
