import { useState, useEffect } from "react";
import Web3 from "web3";
import Tickets from "../artifacts/abi.json";
import { ethers } from "ethers";

const TransferTicket = () => {
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState<any | null>(null);
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);
  const [balance, setBalance] = useState<number | null>(null);
  const [keystore, setKeystore] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState<any | null>(null);
  const [transactionStatus, setTransactionStatus] = useState("");

  const web3 = new Web3("https://rpc2.sepolia.org");
  const CONTRACT_ADDRESS = "0xef7798343c8d5e4cc4c2b2cf3d1a59267710ebce";

  const checkBalance = async () => {
    if (wallet && contract) {
      const tokenBalance = await contract.methods.balanceOf(wallet.address).call();
      setBalance(Number(tokenBalance));
    }
  };

  useEffect(() => {
    const loadContract = async () => {
      const contractInstance = new web3.eth.Contract(Tickets.abi, CONTRACT_ADDRESS);
      setContract(contractInstance);
    };
    loadContract();
  }, [wallet]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      const decryptedWallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
      setWallet(decryptedWallet);
      setMessage("Wallet decrypted successfully!");

      web3.eth.accounts.wallet.add(decryptedWallet.privateKey);
      web3.eth.defaultAccount = decryptedWallet.address;
      console.log("Wallet address:", decryptedWallet.address);
    } catch (error) {
      console.error(error);
      setMessage("Error decrypting wallet.");
    }
  };

  const transferTicket = async () => {
    if (!wallet || !wallet.address || !recipient || !contract) {
      setMessage("Please decrypt your wallet, enter a recipient address, and ensure it has a valid address.");
      return;
    }
    try {
      setTransactionStatus("Transaction pending...");

      const gasPrice = await web3.eth.getGasPrice();
      console.log("Gas price:", gasPrice);

      const gasEstimate = await contract.methods.transferTicket(recipient, amount).estimateGas({
        from: wallet.address,
      });
      const gasLimit = Math.floor(Number(gasEstimate) * 1.1);
      const gasLimitHex = web3.utils.toHex(gasLimit);

      console.log("Gas limit:", gasLimitHex);

      const tx = {
        from: wallet.address,
        to: CONTRACT_ADDRESS,
        gas: gasLimitHex,
        gasPrice: gasPrice,
        data: contract.methods.transferTicket(recipient, amount).encodeABI(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, wallet.privateKey);

      web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on("transactionHash", function (hash) {
          setTransactionStatus(`Transaction successful! Hash: ${hash}`);
        })
        .on("error", function (error) {
          console.error(error);
          setTransactionStatus("Transaction failed!");
        });
    } catch (error) {
      console.error(error);
      setTransactionStatus("Error occurred during the transaction.");
    }
  };

  useEffect(() => {
    if (wallet && contract) {
      checkBalance();
    }
  }, [wallet, contract]);

  return (
    <div>
      <h1 className="h">Transfer Ticket</h1>
      <div className="event">
        <input type="file" onChange={handleFileUpload} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className = 'input'
          placeholder="Key Store Password"
        />
        <button className="wbutton" onClick={decryptWallet}>
          Decrypt Wallet
        </button>
        <input
          type="text"
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className = 'input'
        />
        <input
          type="number"
          placeholder="Amount of tickets"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className = 'input'
        />
        <button className="wbutton" onClick={transferTicket}>
          Transfer Ticket
        </button>
        {message && <p>{message}</p>}
        {transactionStatus && <p>{transactionStatus}</p>}
      </div>
    </div>
  );
};

export default TransferTicket;
