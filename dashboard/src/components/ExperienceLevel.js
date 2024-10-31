import React, { useState, useEffect } from 'react';
import './components.css';

let experienceLevelsData = [
  { id: 1, name: 'Associate' },
  { id: 2, name: 'Senior' },
  { id: 3, name: 'Manager' },
];

const fetchExperienceLevels = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return experienceLevelsData;
};

const addExperienceLevel = async (newLevel) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newId = experienceLevelsData.length + 1;
  const levelToAdd = { id: newId, name: newLevel };
  experienceLevelsData.push(levelToAdd);
  return levelToAdd;
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
          <div key={level.id} className="tag">{level.name}</div>
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
