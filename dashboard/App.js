import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProfileCard from './components/ProfileCard';
import Skills from './components/Skills';
import ExperienceLevel from './components/ExperienceLevel';
import Locations from './components/Locations';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
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
      <Footer />
    </div>
  );
}

export default App;
