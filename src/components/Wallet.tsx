import "../styles/Wallet.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import Web3 from "web3";
import { saveAs } from "file-saver";

let web3: Web3;

declare global {
  interface Window {
    ethereum: any;
  }
}

const CreateWallet: React.FC = () => {
  const [createPassword, setCreatePassword] = useState("");
  const [loadPassword, setLoadPassword] = useState("");
  const [createAddress, setCreateAddress] = useState<string | null>(null);
  const [loadAddress, setLoadAddress] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [keystore, setKeystore] = useState<string | null>(null);
  const [loadedPrivateKey, setLoadedPrivateKey] = useState<string | null>(null);
  const [loadedKeystore, setLoadedKeystore] = useState<string | null>(null);
  const [uploadedKeystore, setUploadedKeystore] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const connectMetamask = async () => {
      if (window.ethereum) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts.length === 0) {
            console.error(
              "No accounts found. Please make sure you're logged in to MetaMask."
            );
          } else {
            web3 = new Web3(window.ethereum);
          }
        } catch (error) {
          console.error("User denied account access:", error);
          web3 = new Web3();
        }
      } else {
        console.error("MetaMask is not installed.");
        web3 = new Web3();
      }
    };

    connectMetamask();
  }, []);

  const handleCreateWallet = async () => {
    if (createPassword === "") {
      alert("Please enter a password for the Key Store");
      return;
    }

    const wallet = web3.eth.accounts.create();

    setCreateAddress(wallet.address);
    setPrivateKey(wallet.privateKey);

    const encryptedKeystore = await web3.eth.accounts.encrypt(
      wallet.privateKey,
      createPassword
    );
    setKeystore(JSON.stringify(encryptedKeystore));

    const sendingAccount = web3.eth.accounts.privateKeyToAccount(
      "0x52b7ff963067c53efe60f15a4bb1266c512759bbbe076956db71099597f6538f"
    );
    web3.eth.accounts.wallet.add(sendingAccount);

    console.log("Sending account address:", sendingAccount.address);
    console.log("New wallet address:", wallet.address);

    web3.eth
      .getBalance(sendingAccount.address)
      .then((balance) => {
        console.log(
          "Sending account balance:",
          web3.utils.fromWei(balance, "ether")
        );
      })
      .catch((error) => {
        console.error("Error getting balance:", error);
      });
    web3.eth
      .sendTransaction({
        from: sendingAccount.address,
        to: wallet.address,
        value: web3.utils.toWei("0.0000000000000000000001", "ether"),
      })
      .then((receipt) => {
        console.log(receipt);
        alert("Wallet created successfully with a balance of 0.000000000001");
      })
      .catch((error) => {
        console.error("Error sending transaction:", error);
      });
  };

  const handleDownloadKeystore = () => {
    if (!keystore || !createAddress) {
      alert("Please create a wallet first");
      return;
    }
    const blob = new Blob([keystore], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, `${createAddress}.json`);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedKeystore(event.target.files[0]);
    }
  };

  const handleLoadWallet = () => {
    if (loadPassword === "" || uploadedKeystore === null) {
      alert("Please upload a Key Store and enter the password.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const keystoreContent = event.target?.result as string;

      try {
        const decryptedWallet = await web3.eth.accounts.decrypt(
          JSON.parse(keystoreContent),
          loadPassword
        );

        setLoadAddress(decryptedWallet.address);
        setLoadedPrivateKey(decryptedWallet.privateKey);
        setLoadedKeystore(JSON.stringify(decryptedWallet));
        alert("Wallet loaded successfully");

        const balanceWei = await web3.eth.getBalance(decryptedWallet.address);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        setBalance(balanceEth);
      } catch (error) {
        console.error("Decryption failed:", error);
        alert(
          "Failed to decrypt keystore. Please check your password and try again."
        );
      }
    };
    reader.readAsText(uploadedKeystore);
  };

  return (
    <div>
      <h1 className="h">Wallet</h1>
      <div className="event">
        <h2>Create Wallet</h2>
        <br />
        <input
          type="password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
          placeholder="Key Store Password"
          className="input"
        />
        <button className="wbutton" onClick={handleCreateWallet}>
          Create Wallet
        </button>
        <br />
        <br />

        {createAddress && (
          <>
            <label htmlFor="walletAddress">Wallet Address:</label>
            <br />
            <textarea
              id="walletAddress"
              rows={5}
              cols={50}
              value={createAddress}
              readOnly
            />
            <br />
          </>
        )}

        {privateKey && (
          <>
            <label htmlFor="privateKey">Private Key:</label>
            <br />
            <textarea
              id="privateKey"
              rows={5}
              cols={50}
              value={privateKey}
              readOnly
            />
            <br />
          </>
        )}

        {keystore && (
          <>
            <label htmlFor="keystore">Keystore File:</label>
            <br />
            <textarea
              id="keystore"
              rows={5}
              cols={50}
              value={keystore}
              readOnly
            />
            <br />
            <br />
            <button className="wbutton" onClick={handleDownloadKeystore}>
              Download Keystore
            </button>
          </>
        )}
        <h2>Decrypt Wallet</h2>
        <input type="file" onChange={handleFileChange} />
        <br />
        <input
          type="password"
          value={loadPassword}
          onChange={(e) => setLoadPassword(e.target.value)}
          placeholder="Key Store Password"
          className="input"
        />
        <br />
        <br />
        <button className="wbutton" onClick={handleLoadWallet}>
          Decrypt Wallet
        </button>

        {loadAddress && (
          <>
            <h2>Decrypted Wallet Info</h2>
            <label htmlFor="loadedWalletAddress">Wallet Address:</label>
            <br />
            <textarea
              id="loadedWallet"
              rows={5}
              cols={50}
              value={loadAddress}
              readOnly
            />
            <br />
          </>
        )}

        {loadedPrivateKey && (
          <>
            <label htmlFor="loadedPrivateKey">Private Key:</label>
            <br />
            <textarea
              id="loadedPrivateKey"
              rows={5}
              cols={50}
              value={loadedPrivateKey}
              readOnly
            />
            <br />
          </>
        )}

        {loadedKeystore && (
          <>
            <label htmlFor="loadedKeystore">Keystore File:</label>
            <br />
            <textarea
              id="loadedKeystore"
              rows={5}
              cols={50}
              value={loadedKeystore}
              readOnly
            />
            <br />
            <br />
          </>
        )}
        {errorMessage && (
          <div id="errorModal" className="modal">
            <div className="modal-content">
              <span
                id="closeModal"
                className="close"
                onClick={() => setErrorMessage(null)}
              >
                &times;
              </span>
              <p id="errorMessage">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateWallet;
