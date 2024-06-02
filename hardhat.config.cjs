require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const provider = "https://rpc2.sepolia.org";
const privateKey =
  "0x52b7ff963067c53efe60f15a4bb1266c512759bbbe076956db71099597f6538f";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [privateKey],
    },
    sepolia: {
      url: provider,
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    scripts: "./scripts",
  },
};
