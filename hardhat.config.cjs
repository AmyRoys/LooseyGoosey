require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const infuraId =
  "https://sepolia.infura.io/v3/c38025e078f74cf99667aa3fa5268998";
const privateKey =
  "0x52b7ff963067c53efe60f15a4bb1266c512759bbbe076956db71099597f6538f";

task(
  "check-balance",
  "Prints the balance of the deployer account",
  async (taskArgs, hre) => {
    const [deployer] = await hre.ethers.getSigners();
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", balance.toString());
  }
);

async function estimateGas() {
  const ContractFactory = await ethers.getContractFactory("YourContract");
  const estimatedGas = await ContractFactory.deploy().estimateGas();
  console.log(`Estimated gas: ${estimatedGas}`);
}

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
      url: infuraId,
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
