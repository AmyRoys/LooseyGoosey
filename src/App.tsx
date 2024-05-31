import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Content from './components/Content';
import Transfer from './components/Transfer';
import Wallet from './components/Wallet';
import Events from './components/Events';
import BuyTicket from './components/buyTicket';
import Balance from './components/Balance';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const App = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
  
    loadBlockchainData();
  }, []);
  
  useEffect(() => {
    console.log('account', account);
  }, [account]);

  console.log('account',account);

  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          {/* <Route path="/balance" element={<Balance />} /> */}
            <Route path="/events" element={<Events/>} />
            <Route path ="/balance" element={<Balance/>}/>
            <Route path="/buyTicket" element={account ? <BuyTicket account={account} /> : <div>Loading...</div>} />
            <Route path="/transfer" element={<Transfer/>} />
            <Route path="/wallet" element={<Wallet/>} />
          <Route path="/" element={<Content />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;