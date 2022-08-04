import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import headerlogo from './image.png'
import headericon from './cross-logo.png'

import './style.css';

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center" >
        <Link to="/">
          <img id="main-logo" src={headericon} alt="logo saying cross-platforum" width="420px"></img>
        </Link>

        <nav className="text-center" id="navbar">
        
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Your Games</Link>
              <a href='/' onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
        <img id ="main-name"  src={headerlogo} alt="game controllers" width="430px"></img>
      </div>
    </header>
  );
};

export default Header;
