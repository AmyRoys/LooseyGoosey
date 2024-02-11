import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Navbar: React.FC = () => {
  return (
    <header className='topbar'>
      <nav >
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;