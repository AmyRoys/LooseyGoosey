const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    const TicketToken = await ethers.getContractFactory("TicketToken");
    const ticketToken = await TicketToken.deploy("1000000000000000000"); // 1 Ether in Wei

    console.log("TicketToken address:", ticketToken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });