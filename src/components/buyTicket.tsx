import { useState, useEffect } from "react";
import Web3 from "web3";
import Tickets from "../artifacts/Tickets.json";

const BuyTicket = ({ account }: { account?: string }) => {
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState<any | null>(null);
  const web3 = new Web3(Web3.givenProvider || "https://sepolia.infura.io/v3/c38025e078f74cf99667aa3fa5268998");
  const [ticketPriceInWei, setTicketPriceInWei] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const CONTRACT_ADDRESS = "0x91095556e20D1343ba3F6C9838EBDF65e90cF158";

  const checkBalance = async () => {
    if (account && contract) {
      const tokenBalance = await contract.methods.balanceOf(account).call();
      setBalance(Number(tokenBalance));
    }
  };
  useEffect(() => {
    const loadContract = async () => {
      const contractInstance = new web3.eth.Contract(
        Tickets.abi,
        CONTRACT_ADDRESS
      );
      setContract(contractInstance);

      // Fetch the ticket price from the contract
      const price = await contractInstance.methods.ticketPriceInWei.call({});
      setTicketPriceInWei(Number(price));
    };
    loadContract();
  }, []);

  const buyTicket = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const gasEstimate = await contract.methods
        .purchaseTicket(1)
        .estimateGas({ from: account });

      await contract.methods.purchaseTicket(1).send({
        from: account,
        gasPrice: gasPrice,
        gas: gasEstimate,
        value: ticketPriceInWei, 
      });
      const tx = await contract.methods.purchaseTicket({ from: account, value: ticketPriceInWei });
      const receipt = await tx.send();
      console.log(receipt); 
      setMessage("Ticket purchased successfully!");
      checkBalance();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (account && contract) {
      checkBalance();
    }
  }, [account, contract]);

  return (
    <div>
      <h1 className="h ">Buy Ticket</h1>
      <div className="event">
        <button className="wbutton" onClick={buyTicket}>
          Buy Ticket
        </button>
        <p>The price of the ticket is: {ticketPriceInWei}</p>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default BuyTicket;
