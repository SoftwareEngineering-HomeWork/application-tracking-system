import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import ProfileCard from './components/ProfileCard';
import Skills from './components/Skills';
import ExperienceLevel from './components/ExperienceLevel';
import Locations from './components/Locations';
import Header from './components/Header';
import Footer from './components/Footer';
import MatchesPage from './components/MatchesPage';
import LoginPage from './components/LoginPage';

function MainContent() {
  return (
    <div className="main-content">
      <div className="top-left">
        <ProfileCard />
      </div>
      <div className="bottom-right">
        <Skills />
        <ExperienceLevel />
        <Locations />
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
        <Header />
        <div className="app-container">
          {isLoggedIn && <Sidebar setIsLoggedIn={setIsLoggedIn} />} {/* Pass setIsLoggedIn here */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/main"
              element={isLoggedIn ? <MainContent /> : <Navigate to="/" />}
            />
            <Route
              path="/matches"
              element={isLoggedIn ? <MatchesPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
