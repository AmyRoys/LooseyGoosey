import React from 'react';
import { Link} from 'react-router-dom';
import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      switch (value.toLowerCase()) {
        case 'form':
          navigate('/about/form');
          break;
        case 'login':
          navigate('/login');
          break;
        case 'home':
            navigate('/');
            break;
        case 'about':
            navigate('/about');
            break;
        case 'feedback':
          navigate('/about/feedback');
          break;
        case 'signup':
          navigate('/login/signup');
          break;
        case 'admin login':
          navigate('/login/alogin');
          break;
        // Add more cases as needed
        default:
          break;
        }
      }
    };

  return (
    <header className='topbar'>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <Link to="/about">About</Link>
            <ul className="submenu">
              <li><Link to="/about/form">Form</Link></li>
              <li><Link to="/about/feedback">Feedback</Link></li>
            </ul>
          </li>
          <li><Link to="/login">Login</Link>
          <ul className="submenu">
              <li><Link to="/login/signup">Sign Up</Link></li>
              <li><Link to="/login/alogin">Admin Login</Link></li>
              
            </ul>
          </li>
          <li className='search'>
            <input type="search" id="siteSearch" name="q"
               aria-label="Search through site content"
               placeholder="Search..."
               onKeyDown={handleKeyDown}/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;