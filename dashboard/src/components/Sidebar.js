import React from 'react';
import './components.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">Search</div>
      <div className="sidebar-item">Manage</div>
      <div className="sidebar-item">Matches</div>
      <div className="sidebar-item">Applications</div>
      <div className="sidebar-item">Profile</div>
      <div className="sidebar-item">Logout</div>
    </div>
  );
}

export default Sidebar;
