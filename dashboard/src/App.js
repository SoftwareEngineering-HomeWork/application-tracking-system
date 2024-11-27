import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProfilePage from './components/profile/ProfilePage';
import MatchesPage from './components/MatchesPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import './App.css';

function MainContent({ setIsLoggedIn }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      axios
        .get('http://localhost:5001/recruiterprofile', {
          headers: {
            userid: userId,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
          setIsLoggedIn(false); // Log the user out on error
        });
    }

    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [setIsLoggedIn]);

  // Handler to update profile
  const updateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile); // Update the state in MainContent
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <div className="top-left">
        <ProfilePage profile={userProfile} updateProfile={updateProfile} />
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <Router>
      <div>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn}/>}
        <div className="app-container">
          {/* {isLoggedIn && <Sidebar setIsLoggedIn={setIsLoggedIn} />} */}
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <LoginPage />} />
            <Route
              path="/main"
              element={isLoggedIn ? <MainContent setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
            />
            <Route
              path="/matches"
              element={isLoggedIn ? <MatchesPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;
