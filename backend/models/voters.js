const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  voterId: String,
  name: String,
  age: Number,
  password: String,
  hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Voter", voterSchema);
