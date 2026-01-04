const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const mongoose = require("mongoose");
const votingContract = require("./blockchain");
const Voter = require("./models/voters");
const Candidate = require("./models/Candidate");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://AnkitRaj:Ankitraj%400706@ankitraj.vclv7qh.mongodb.net/E_voting?retryWrites=true&w=majority&appName=AnkitRaj"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/hash/:data", (req, res) => {
  const input = req.params.data;
  const hash = sha256(input);
  res.json({ input, hash });
});

app.post("/register", async (req, res) => {
  const { voterId, name, age, password } = req.body;

  const existing = await Voter.findOne({ voterId });
  if (existing) {
    return res.status(400).json({ message: "Voter already exists" });
  }

  const voter = new Voter({
    voterId,
    name,
    age,
    password,
  });

  await voter.save();

  res.json({ message: "Voter registered successfully" });
});

app.post("/login", async (req, res) => {
  console.log("LOGIN API HIT");
  console.log(req.body);

  const { voterId, password } = req.body;

  const voter = await Voter.findOne({ voterId });
  if (!voter) return res.status(401).json({ message: "Invalid voter" });

  if (voter.password !== password)
    return res.status(401).json({ message: "Wrong password" });

  if (voter.hasVoted) return res.status(403).json({ message: "Already voted" });

  res.json({ message: "Login successful" });
});

app.post("/vote", async (req, res) => {
  const { voterId, candidateId } = req.body;

  const voter = await Voter.findOne({ voterId });
  if (!voter || voter.hasVoted)
    return res.status(403).json({ message: "Already voted" });

  const candidate = await Candidate.findById(candidateId);
  if (!candidate)
    return res.status(404).json({ message: "Candidate not found" });

  const voteHash = sha256(voterId + candidateId + new Date().toISOString());

  const tx = await votingContract.castVote(
    "0x" + voteHash 
  );
  await tx.wait();

  await tx.wait();

  voter.hasVoted = true;
  await voter.save();

  res.json({
    message: "Vote cast successfully",
    txHash: tx.hash,
  });
});

app.get("/candidates", async (req, res) => {
  const candidates = await Candidate.find({});
  res.json(candidates);
});

app.get("/results", async (req, res) => {
  const totalVotes = await votingContract.getTotalVotes();
  res.json({ totalVotes: totalVotes.toString() });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
