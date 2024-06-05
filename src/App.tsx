import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Content from './components/Content';
import Transfer from './components/Transfer';
import Wallet from './components/Wallet';
import Events from './components/Events';
import BuyTicket from './components/buyTicket';
import Balance from './components/Balance';

const App = () => {

  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          {/* <Route path="/balance" element={<Balance />} /> */}
            <Route path="/events" element={<Events/>} />
            <Route path ="/balance" element={<Balance/>}/>
            <Route path="/buyTicket" element={<BuyTicket  />} />
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