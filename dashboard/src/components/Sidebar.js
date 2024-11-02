import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-item">Profile</Link>
      <Link to="/matches" className="sidebar-item">Matches</Link>
      <div className="sidebar-item">Logout</div>
    </div>
  );
}

export default Sidebar;
