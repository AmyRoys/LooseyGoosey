import "../styles/Balance.css";
import React, { useState } from "react";
import Web3 from "web3";
import { isAddress } from "web3-utils";

const Balance: React.FC = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    if (!isAddress(address)) {
      setError("Invalid address");
      return;
    }

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        setBalance(balanceEth);
        setError(null);
      } catch (err) {
        setError("Failed to fetch balance");
      }
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <h1 className="h">Balance</h1>
      <div className="event">
        <input
          type="text"
          placeholder="Enter wallet address"
          value={address}
          onChange={handleAddressChange}
          className = 'input'
        />
        <button className = 'button' onClick={fetchBalance}> Wallet Balance</button>
        <input
          type="text"
          value={tokenBalance || ""}
          placeholder="Enter token address"
          className = 'input'
        />
        <button className ='button' onClick={fetchBalance}>Token Balance</button>
        {error && <p>Error: {error}</p>}
        {balance !== null ? (
          <p>Balance: {balance} ETH</p>
        ) : (
          <p>Enter an address and click "Balance"</p>
        )}
      </div>
    </div>
  );
};

export default Balance;