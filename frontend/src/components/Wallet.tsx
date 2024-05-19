import '../styles/Wallet.css';
import React, { useState } from 'react';
import Web3 from 'web3';
import { saveAs } from 'file-saver';

const CreateWallet: React.FC = () => {
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [keystore, setKeystore] = useState<string | null>(null);

  const handleCreateWallet = () => {
    if (password === '') {
      alert('Please enter a password for the Key Store');
      return;
    }

    const web3 = new Web3();
    const wallet = web3.eth.accounts.create();
    setAddress(wallet.address);
    setPrivateKey(wallet.privateKey);

    const keystore = web3.eth.accounts.encrypt(wallet.privateKey, password);
    setKeystore(JSON.stringify(keystore));
  };

  const handleDownloadKeystore = () => {
    if (!keystore || !address) {
      alert('Please create a wallet first');
      return;
    }
    const blob = new Blob([keystore], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${address}.json`);
  };

  return (
    <div>
      <h1>Create a Wallet</h1>
      <button onClick={handleCreateWallet}>Create Wallet</button>
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password for the Key Store"
      />
      <br /><br />

      {address && (
        <>
          <label htmlFor="walletAddress">Wallet Address:</label>
          <br />
          <textarea id="walletAddress" rows={5} cols={50} value={address} readOnly />
          <br />
        </>
      )}

      {privateKey && (
        <>
          <label htmlFor="privateKey">Private Key:</label>
          <br />
          <textarea id="privateKey" rows={5} cols={50} value={privateKey} readOnly />
          <br />
        </>
      )}

      {keystore && (
        <>
          <label htmlFor="keystore">Keystore File:</label>
          <br />
          <textarea id="keystore" rows={5} cols={50} value={keystore} readOnly />
          <br /><br />
          <button onClick={handleDownloadKeystore}>Download Keystore</button>
        </>
      )}
    </div>
  );
};

export default CreateWallet;
