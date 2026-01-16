const { ethers } = require("ethers");
// Ganache RPC
const provider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:7545"
);

// 🔑 Private key from Ganache (WITHOUT 0x)
const privateKey = "cab40402a8c8af4ea60f93da8051e65562328d14a5340026d06aa9aa739485ab";

// Wallet
const wallet = new ethers.Wallet(privateKey, provider);

// 📄 Contract details
const contractAddress = "0xc40C972C94B97b8EC81b266962C2bB1F6C090fe9";
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
