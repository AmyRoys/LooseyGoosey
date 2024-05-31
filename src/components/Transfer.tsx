import '../styles/Transfer.css';
import React, { useState } from "react";
import Web3 from "web3";
import Tickets from '../artifacts/Tickets.json';

const TransferTicketPage: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");

  const handleTransferTicket = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const contractAddress = "YOUR_CONTRACT_ADDRESS"; 
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
      <div className ='event'>
      <input
      type ="text"
      value= {sender}
      onChange = {(e) => setSender(e.target.value)}
      placeholder= "Sending from"
      className = 'input'
      
      />
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Sending to"
        className = 'input'
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Number of tickets"
        className = 'input'
      />
      <button className = 'button' onClick={handleTransferTicket}>Transfer Ticket</button>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TransferTicketPage;
