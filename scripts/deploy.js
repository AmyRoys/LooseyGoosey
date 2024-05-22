async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const TicketToken = await ethers.getContractFactory("Tickets");
    const ticketToken = await TicketToken.deploy("1000000000000000000"); // 1 ETH in wei
  
    console.log("TicketToken deployed to:", ticketToken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  