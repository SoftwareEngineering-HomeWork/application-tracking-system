// Header.js
import React from 'react';
import './Header.css'; // Create this new CSS file for the header styles
import { useNavigate } from 'react-router-dom';

function Header({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage and update the state
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false); // Update the parent component's state
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="header">
      <h1 className="header-title">JTracker - Recruiter</h1>
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
