import React, { useState, useEffect } from 'react';
import './components.css';

let experienceLevelsData = [
  { id: 1, name: 'Associate' },
  { id: 2, name: 'Senior' },
  { id: 3, name: 'Manager' },
];

const fetchExperienceLevels = async () => {
  const response = await fetch('http://localhost:5001/recruiter/experience');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const addExperienceLevel = async (newLevel) => {
  const response = await fetch('http://localhost:5001/recruiter/experience', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({newLevel})
  });

  if (!response.ok) {
    throw new Error('Failed to add skill');
  }

  return newLevel;
};

function ExperienceLevel() {
  const [levels, setLevels] = useState([]);
  const [newLevel, setNewLevel] = useState('');

  useEffect(() => {
    fetchExperienceLevels().then(setLevels);
  }, []);

  const handleAddLevel = async (e) => {
    e.preventDefault();
    if (newLevel.trim()) {
      const addedLevel = await addExperienceLevel(newLevel);
      setLevels([...levels, addedLevel]);
      setNewLevel('');
    }
  };

  return (
    <div className="card">
      <h3>Experience Level</h3>
      <div className="tags">
        {levels.map((level) => (
          <div key={level} className="tag">{level}</div>
        ))}
      </div>
      <form onSubmit={handleAddLevel} className="form">
        <input
          type="text"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          placeholder="Add a new experience level"
          className="input"
        />
        <button type="submit" className="button">Add Level</button>
      </form>
    </div>
  );
}

export default ExperienceLevel;
