const Web3 = require("web3");
const fs = require("fs");

// Connect to the network
let web3 = new Web3.default("http://localhost:8545");

// Read the JSON file
let jsonFile = fs.readFileSync("build/contracts/TicketToken.json", "utf8");
let contractJson = JSON.parse(jsonFile);

// Get the contract ABI
let abi = contractJson.abi;

// Get the contract bytecode
let bytecode = contractJson.bytecode;

// Create a new contract instance
let contract = new web3.eth.Contract(abi);

let constructorArgs = [1000000000000000000];

// Get the list of accounts
web3.eth.getAccounts().then((accounts) => {
  // Deploy the contract
  contract
    .deploy({
      data: bytecode,
      arguments: constructorArgs,
    })
    .send({
      from: accounts[0], // deploy from the first account
      gas: 1500000,
      gasPrice: "30000000000000",
    })
    .then((newContractInstance) => {
      console.log(newContractInstance.options.address); // instance with the new contract address
    });
});
