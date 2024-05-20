import React, { useState } from "react";
import Web3 from "web3";
import TicketToken from "./TicketToken.json"; // ABI file from the compiled contract

const BuyTicketPage: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleBuyTicket = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
      const ticketToken = new web3.eth.Contract(TicketToken.abi, contractAddress);

      try {
        const ticketPriceInWei = await ticketToken.methods.ticketPriceInWei().call();
        const totalCost = ticketPriceInWei * amount;

        await ticketToken.methods.purchaseTicket(amount).send({
          from: accounts[0],
          value: totalCost,
        });

        setMessage("Ticket purchased successfully!");
      } catch (error) {
        console.error("Error purchasing ticket:", error);
        setMessage("Error purchasing ticket.");
      }
    }
  };

  return (
    <div>
      <h1 className="h">Tickets</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Number of tickets"
      />
      <button onClick={handleBuyTicket}>Buy Ticket</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BuyTicketPage;
