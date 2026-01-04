const { ethers } = require("ethers");
// Ganache RPC
const provider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:7545"
);

// 🔑 Private key from Ganache (WITHOUT 0x)
const privateKey = "24a673a68cdab6f564de292e70fc482b7ddb01d2f712d2f2e08937d20aee5ac5";

// Wallet
const wallet = new ethers.Wallet(privateKey, provider);

// 📄 Contract details
const contractAddress = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "voteHash",
				"type": "bytes32"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "voteHashes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const votingContract = new ethers.Contract(
  contractAddress,
  contractABI,
  wallet
);

module.exports = votingContract;
