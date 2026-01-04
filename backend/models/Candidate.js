const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  state: String,
  constituency: String,
  name: String,
  party: String,
  symbol: String
});

module.exports = mongoose.model("Candidate", candidateSchema);
