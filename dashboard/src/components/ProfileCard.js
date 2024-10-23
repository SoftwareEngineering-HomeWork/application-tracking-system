import React from 'react'; 
import './ProfileCard.css';
import profilePic from '../assets/profile-pic.png'; // Placeholder image

function ProfileCard() {
  return (
    <div className="card">
      <div className="profile-image">
        <img src={profilePic} alt="Profile" className="profile-pic"/>
      </div>
      <h3>Prithish Samanta</h3>
      <p>North Carolina State University</p>
      <p>Email: psamant2@ncsu.edu</p>
      <p>Phone: 919-876-5432</p>
      <p>Address: Avery Close Apartments</p>
    </div>
  );
}

export default ProfileCard;