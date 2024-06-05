# Blockchain
---

This is a Web3 Distributed Application (DApp) that implements a simple ticketing system. It uses the Ethereum Sepolia Testnet for Solidity smart contract deployment and Typescript React for the frontend.


## Links
---

Contract: [0xef7798343c8d5e4cc4c2b2cf3d1a59267710ebce](https://sepolia.etherscan.io/address/0xef7798343c8d5e4cc4c2b2cf3d1a59267710ebce)

Contract Creator Wallet: [0x9c78dC59550c046aDEE06DdD713CBd37FB4448CE](https://sepolia.etherscan.io/address/0x9c78dC59550c046aDEE06DdD713CBd37FB4448CE)

Venue / Doorman Wallet: [0xB978924429A32b4c6A4f294305e6205AEFd058fC](https://sepolia.etherscan.io/address/0xB978924429A32b4c6A4f294305e6205AEFd058fC)

Ticket Purchaser Wallet: [0x2C8c7631d4f599feA6071276ba4f32c511772e37](https://sepolia.etherscan.io/address/0x2C8c7631d4f599feA6071276ba4f32c511772e37)


## Running the Application
---

To run this application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies by running `npm install`.
4. Start the application by running `npm run dev`.

The application will start and can be accessed at `http://localhost:5173/`.


## Testing
---
Tests are located in the `test` directory.
To run the tests, stay in the root directory and run the command `npx hardhat test`.


## Contract Details
---

The smart contract `Tickets.sol` inherits from OpenZeppelin's ERC-20 implementation to allow for purchasing and transfering of tickets. 

### Deployment
The contract was deployed using [Hardhat](https://hardhat.org/), a development environment for Ethereum. 

Here are the steps that were followed:

1. Install Hardhat by running `npm install --save-dev hardhat`.
2. Create a Hardhat project by running `npx hardhat`.
3. Write the contract in Solidity and save it in the `contracts` directory.
4. Compile the contract by running `npx hardhat compile`.
5. Write a deployment script in the `scripts` directory.
6. Run the deployment script by running `npx hardhat run scripts/deploy.js`.
7. The ABI will be generated in the  `src/artifacts `directory `abi.json`.
