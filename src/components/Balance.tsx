import "../styles/Balance.css";
import React, { useState } from "react";
import Web3 from "web3";
import { isAddress } from "web3-utils";
import Tickets from "../artifacts/abi.json";

const Balance: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const CONTRACT_ADDRESS = "0xef7798343c8d5e4cc4c2b2cf3d1a59267710ebce";

  const fetchBalance = async () => {
    if (!isAddress(walletAddress)) {
      setError("Invalid address");
      return;
    }

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const balanceWei = await web3.eth.getBalance(walletAddress);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        setBalance(balanceEth);

        const contract = new web3.eth.Contract(Tickets.abi, CONTRACT_ADDRESS);
        console.log(walletAddress);
        const tokenBalanceWei = await contract.methods.balanceOf(walletAddress).call();
        const tokenBalance = web3.utils.fromWei(tokenBalanceWei, "ether");
        setTokenBalance(tokenBalance);

        setError(null);
      } catch (err) {
        setError("Failed to fetch balance");
      }
    }
  };

  const handleWalletAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  return (
    <div>
      <h1 className="h">Balance</h1>
      <div className="event">
        <input
          type="text"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={handleWalletAddressChange}
          className="input"
        />
        <button className="button" onClick={fetchBalance}>
          Fetch Balances
        </button>
        {error && <p>Error: {error}</p>}
        {balance !== null ? (
          <p>Wallet Balance: {balance} ETH</p>
        ) : (
          <p>Enter an address and click "Fetch Balances"</p>
        )}
        {tokenBalance !== null && (
          <p>Token Balance: {tokenBalance} TICKET</p>
        )}
      </div>
    </div>
  );
};

export default Balance;
