import "../styles/Wallet.css";
import React, { ChangeEvent, useState } from "react";
import Web3 from "web3";
import { saveAs } from "file-saver";

const CreateWallet: React.FC = () => {
  const [createPassword, setCreatePassword] = useState("");
  const [loadPassword, setLoadPassword] = useState("");
  const [createAddress, setCreateAddress] = useState<string | null>(null);
  const [loadAddress, setLoadAddress] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [keystore, setKeystore] = useState<string | null>(null);
  const [uploadedKeystore, setUploadedKeystore] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    if (createPassword === "") {
      alert("Please enter a password for the Key Store");
      return;
    }

    const web3 = new Web3();
    console.log("web instance", web3);
    const wallet = web3.eth.accounts.create();
    console.log("wallet", wallet);

    setCreateAddress(wallet.address);
    setPrivateKey(wallet.privateKey);
    console.log("Private Key:", wallet.privateKey);
    console.log("Password:", createPassword);

    const encryptedKeystore = await web3.eth.accounts.encrypt(
      wallet.privateKey,
      createPassword
    );
    setKeystore(JSON.stringify(encryptedKeystore));
    console.log("encrypted keystore:", encryptedKeystore);
    alert("Wallet created successfully");
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
    if (!uploadedKeystore) {
      alert("Please upload a keystore file");
      return;
    }

    if (loadPassword === "") {
      alert("Please enter the password for the Key Store");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const keystoreContent = event.target?.result as string;
      console.log("Keystore Content:", keystoreContent);
      try {
        const web3 = new Web3();
        const decryptedWallet = await web3.eth.accounts.decrypt(
          JSON.parse(keystoreContent),
          loadPassword
        );
        console.log("Decrypted Wallet", decryptedWallet);
        setLoadAddress(decryptedWallet.address);
        setPrivateKey(decryptedWallet.privateKey);
        setKeystore(keystoreContent);
        alert("Wallet loaded successfully");
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
        <button className="wbutton" onClick={handleCreateWallet}>
          Create Wallet
        </button>
        <br />
        <input
          type="password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
          placeholder="Enter a password for the Key Store"
        />
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
        <h2>Load Wallet</h2>
        <input type="file" onChange={handleFileChange} />
        <br />
        <input
          type="password"
          value={loadPassword}
          onChange={(e) => setLoadPassword(e.target.value)}
          placeholder="Enter the password for the Key Store"
        />
        <br />
        <br />
        <button className="wbutton" onClick={handleLoadWallet}>
          Load Wallet
        </button>
        {loadAddress && (
          <>
            <h2>Loaded Wallet Info</h2>
            <label htmlFor="loadedWalletAddress">Wallet Address:</label>
            <br />
            <textarea
              id="loadedWalletAddress"
              rows={5}
              cols={50}
              value={loadAddress}
              readOnly
            />
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
