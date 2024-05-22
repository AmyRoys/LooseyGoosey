import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Tickets from '../artifacts/Tickets.json';

const BuyTicket = ({ account }) => {
  const [message, setMessage] = useState('');
  const [contract, setContract] = useState(null);
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  useEffect(() => {
    const loadContract = async () => {
      const contractInstance = new web3.eth.Contract(Tickets.abi, CONTRACT_ADDRESS);
      setContract(contractInstance);
    };
    loadContract();
  }, []);

  const buyTicket = async () => {
    if (!contract) return;

    try {
      await contract.methods.buyToken().send({ from: account, value: web3.utils.toWei('0.01', 'ether') });
      setMessage('Ticket purchased successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error purchasing ticket.');
    }
  };

  return (
    <div>
      <button onClick={buyTicket}>Buy Ticket</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BuyTicket;
