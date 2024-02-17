import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar: React.FC = () => {
  return (
    <header className='topbar'>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <Link to="/about">About</Link>
            <ul className="submenu">
              <li><Link to="/about/form">Form</Link></li>
            </ul>
          </li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;