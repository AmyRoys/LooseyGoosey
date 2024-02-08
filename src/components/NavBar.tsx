import React from 'react';
import '../styles/Navbar.css';
const Navbar: React.FC = () => {
  return (
    <nav className='topbar'>
      <ul>
        <a href="/about">About</a>
        <a href="/login">Login</a>
      </ul>
    </nav>
  );
};

export default Navbar;