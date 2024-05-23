import { useState, useEffect } from "react";
import Web3 from "web3";
import Tickets from "../artifacts/Tickets.json";

const BuyTicket = ({ account }: { account?: string }) => {
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState<any | null>(null);
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const [ticketPriceInWei, setTicketPriceInWei] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
