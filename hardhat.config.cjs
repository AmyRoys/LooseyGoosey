require("@nomiclabs/hardhat-waffle");

const fs = require('fs');
//const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";

// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
const infuraId = "your_infura_id";
const privateKey = "0xa6b8739d185b5e27e1d3f8c8c149f1285f0819bfbb552c7f09c407b96f708853";

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache GUI
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    scripts: "./scripts",
  },
};