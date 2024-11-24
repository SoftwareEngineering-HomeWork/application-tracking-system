// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/main" className="sidebar-item">Profile</Link>
      <Link to="/matches" className="sidebar-item">Matches</Link>
    </div>
  );
}

export default Sidebar;
