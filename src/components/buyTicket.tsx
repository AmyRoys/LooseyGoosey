import { useState, useEffect } from "react";
import Web3 from "web3";
import Tickets from "../artifacts/Tickets.json";
import { ethers } from "ethers";

const BuyTicket = () => {
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState<any | null>(null);
  const [ticketPriceInWei, setTicketPriceInWei] = useState<BigInt | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [keystore, setKeystore] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState<any | null>(null);

  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc2.sepolia.org")
  );
  const CONTRACT_ADDRESS = "0x1505d2d340e6199cc65f70745748eC620eF3345a";

  const checkBalance = async () => {
    if (wallet && contract) {
      const tokenBalance = await contract.methods
        .balanceOf(wallet.address)
        .call();
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

      const ticketPriceInWei: BigInt = await contractInstance.methods
        .ticketPriceInWei()
        .call();
      setTicketPriceInWei(ticketPriceInWei as BigInt);
    };
    loadContract();
  }, [wallet]);

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

  const buyTicket = async () => {
    if (!wallet || !wallet.address || !ticketPriceInWei || !contract) {
      setMessage(
        "Please decrypt your wallet and ensure it has a valid address."
      );
      return;
    }
    try {
      const ticketPrice = await contract.methods.ticketPriceInWei().call();

      console.log(
        "Ticket price",
        ticketPrice,
        "ticket price in wei",
        ticketPriceInWei
      );
      if (ticketPrice !== ticketPriceInWei) {
        setMessage("Ticket price has changed!");
        return;
      }
      // Check contract balance
      const contractBalance = await web3.eth.getBalance(
        contract.options.address
      );
      console.log(
        "Contract balance:",
        web3.utils.fromWei(contractBalance, "ether"),
        "ETH"
      );
      try {
        const nodeInfo = await web3.eth.getNodeInfo();
        console.log("Connected to node:", nodeInfo);
      } catch (error) {
        console.error("Error getting node info:", error);
      }
      const gasPrice = await web3.eth.getGasPrice();
      console.log("Gas price:", gasPrice);

      // Debugging: Print current wallet balance
      const walletBalance = await web3.eth.getBalance(wallet.address);
      console.log(
        "Wallet balance:",
        web3.utils.fromWei(walletBalance, "ether"),
        "ETH"
      );

      const gasEstimate = await contract.methods.purchaseTicket(1).estimateGas({
        from: wallet.address,
        value: ticketPriceInWei.toString(),
      });
      console.log(wallet.address);
      const gasLimit = Math.floor(Number(gasEstimate) * 1.1);
      const gasLimitHex = web3.utils.toHex(gasLimit);

      console.log("Gas limit:", gasLimitHex);

      const tx = {
        from: wallet.address,
        to: CONTRACT_ADDRESS,
        gas: gasLimitHex,
        gasPrice: gasPrice,
        value: ticketPriceInWei.toString(),
        data: contract.methods.purchaseTicket(1).encodeABI(),
      };

      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        wallet.privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      await contract.methods.purchaseTicket(1).send({
        from: wallet.address,
        gasPrice: gasPrice,
        gas: gasLimitHex,
        value: ticketPriceInWei.toString(),
      });
      const ticketBalance = await contract.methods
        .balanceOf(wallet.address)
        .call();
      const decimals = BigInt(await contract.methods.decimals().call());
      console.log("Ticket balance:", ticketBalance / BigInt(10) ** decimals);
      setMessage("Ticket purchased successfully!");
      checkBalance();
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        // type guard
        const err = error as { code?: string; message?: string }; // type assertion
        console.error(err);
        if (err.code === "INSUFFICIENT_FUNDS") {
          setMessage("Error purchasing ticket: Insufficient funds.");
        } else if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
          setMessage("Error purchasing ticket: Unpredictable gas limit.");
        } else if (err.message) {
          setMessage(`Error purchasing ticket: ${err.message}`);
        } else {
          setMessage("Error purchasing ticket.");
        }
      } else {
        setMessage("Error purchasing ticket.");
      }
    }
  };

  useEffect(() => {
    if (wallet && contract) {
      checkBalance();
    }
  }, [wallet, contract]);

  return (
    <div>
      <h1 className="h">Buy Ticket</h1>
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
        <p>The price of the ticket is: {ticketPriceInWei?.toString()} Wei</p>
        <button className="wbutton" onClick={buyTicket}>
          Buy Ticket
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default BuyTicket;
