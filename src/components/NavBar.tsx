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
          <Link to="/about">Balance</Link>
          <Link to="/about">Events</Link>
          <Link to="/about">Transfer</Link>
          <Link className='login' to="/about">Wallet</Link>
        </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;