import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import ProfileCard from './components/ProfileCard';
import Skills from './components/Skills';
import ExperienceLevel from './components/ExperienceLevel';
import Locations from './components/Locations';
import Header from './components/Header';
import Footer from './components/Footer';
import ApplicationPage from './components/ApplicationPage';

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
  return (
    <Router>
    <div>
    <Header />
    <div className="app-container">
      <Sidebar />
        <Routes>
          <Route path="/" className="top-left" element={<MainContent />} />
          <Route path="/application-page" element={<ApplicationPage />} />
        </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
