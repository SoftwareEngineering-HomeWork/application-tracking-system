// Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './components.css';

function Sidebar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage and update the state
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false); // Update the parent component's state
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="sidebar">
      <Link to="/main" className="sidebar-item">Profile</Link>
      <Link to="/matches" className="sidebar-item">Matches</Link>
      <div 
        className="sidebar-item" 
        style={{ cursor: 'pointer', color: 'red' }} 
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
