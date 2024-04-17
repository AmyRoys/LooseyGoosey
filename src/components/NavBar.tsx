import React from 'react';
import { Link} from 'react-router-dom';
import '../styles/NavBar.css';
import gooseHead from '../assets/images/gooseHead.png';


const Navbar: React.FC = () => {


  return (
    <header className='topbar'>
      <nav>
        <ul>
        <li>
            <Link to="/">
              <img className = 'gooseHead' src={gooseHead}alt="Home" /> 
            </Link>
          </li>

        <li className= "navbar-right">
          <Link to="/balance">Balance</Link>
          <Link to="/events">Events</Link>
          <Link to="/transfer">Transfer</Link>
          <Link className='wallet' to="/wallet">Wallet</Link>
        </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;