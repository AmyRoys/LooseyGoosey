import "../styles/Transfer.css";
import React, { useState } from "react";
import Web3 from "web3";
import Tickets from "../artifacts/Tickets.json";
import { ethers } from "ethers";

const TransferTicketPage: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [keystore, setKeystore] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState<any | null>(null);

  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc2.sepolia.org")
  );
  const CONTRACT_ADDRESS = "0x1505d2d340e6199cc65f70745748eC620eF3345a";

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event: ProgressEvent<FileReader>) {
        if (event.target) {
          setKeystore(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const decryptWallet = async () => {
    if (!keystore || !password) {
      setMessage("Please upload your keystore file and enter your password.");
      return;
    }
    try {
      const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
        keystore,
        password
      );
      setWallet(decryptedWallet);
      setMessage("Wallet decrypted successfully!");

      web3.eth.accounts.wallet.add(decryptedWallet.privateKey);
      web3.eth.defaultAccount = decryptedWallet.address;
    } catch (error) {
      console.error(error);
      setMessage("Error decrypting wallet.");
    }
  };
  const handleTransferTicket = async () => {
    if (!recipient || amount <= 0 || !keystore || !password) {
      setMessage(
        "Please enter a valid recipient, amount, keystore, and password."
      );
      return;
    }
    const reader = new FileReader();

    reader.onload = async (evt) => {
      if (evt.target === null) {
        setMessage("Error reading keystore file.");
        return;
      }
      
      const keystoreJson = JSON.parse(evt.target.result);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = wallet.connect(provider);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Tickets.abi,
          signer
        );
        const decimals = await contract.decimals();
        const actualAmount = ethers.utils.parseUnits(amount.toString(), decimals);
        const transactionResponse = await contract.transferTicket(
          recipient,
          amount
        );
        await transactionResponse.wait();
        setMessage("Ticket transferred successfully!");
      } catch (error) {
        console.error("Error transferring ticket:", error);
        setMessage("Error transferring ticket.");
      }
    };
  };
  return (
    <div>
      <h1 className="h">Transfer Ticket</h1>
      <div className="event">
        <input type="file" onChange={handleFileUpload} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="wbutton" onClick={decryptWallet}>
          Decrypt Wallet
        </button>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Sending to"
          className="input"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder="Number of tickets"
          className="input"
        />
        <button className="button" onClick={handleTransferTicket}>
          Transfer Ticket
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default TransferTicketPage;
