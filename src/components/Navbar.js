import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-item navbar-brand" to="/">Home</Link>
        <div className="account-dropdown navbar-item">
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            <i className="icon icon-user_profile_new"></i>
            <span>Account</span>
            <i className={`icon ${dropdownOpen ? 'icon-up' : 'icon-down'}`}></i>
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul className="dropdown-list">
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/login">User Login</Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/register">New User Registration</Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/owner-login">Owner Login</Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/owner-register">New Owner Registration</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
