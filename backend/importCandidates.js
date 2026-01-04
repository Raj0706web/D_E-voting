const csv = require("csvtojson");
const mongoose = require("mongoose");
const Candidate = require("./models/Candidate");

mongoose.connect("mongodb+srv://AnkitRaj:Ankitraj%400706@ankitraj.vclv7qh.mongodb.net/E_voting?retryWrites=true&w=majority&appName=AnkitRaj");

csv()
.fromFile("./candidates.csv")
.then(async (data) => {
  const formatted = data.map(c => ({
    state: c.STATE,
    constituency: c.CONSTITUENCY,
    name: c.NAME,
    party: c.PARTY,
    symbol: c.SYMBOL
  }));

  await Candidate.insertMany(formatted);
  console.log("Candidates imported successfully");
  process.exit();
});
