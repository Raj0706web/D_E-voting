require("@nomiclabs/hardhat-ethers");
const path = require("path");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {}
      }
    ]
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    cache: "./cache"
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "51340d3cda4973f24d5bb450a257714653ab74c0ac8584a858a61ddcec3ecc0e"
      ]
    }
  }
};
