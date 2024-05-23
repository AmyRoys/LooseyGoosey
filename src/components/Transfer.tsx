import '../styles/Transfer.css';
import React, { useState } from "react";
import Web3 from "web3";
import Tickets from '../artifacts/Tickets.json'; // ABI file from the compiled contract

const TransferTicketPage: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleTransferTicket = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
      const ticketToken = new web3.eth.Contract(Tickets.abi, contractAddress);

      try {
        await ticketToken.methods.transferTicket(recipient, amount).send({
          from: accounts[0],
        });

        setMessage("Ticket transferred successfully!");
      } catch (error) {
        console.error("Error transferring ticket:", error);
        setMessage("Error transferring ticket.");
      }
    }
  };

  return (
    <div>
      <h1 className='h'>Transfer Ticket</h1>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Number of tickets"
      />
      <button onClick={handleTransferTicket}>Transfer Ticket</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TransferTicketPage;
