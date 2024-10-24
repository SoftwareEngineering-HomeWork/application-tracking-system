import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './components.css';

// Dummy API functions
let skillsData = [
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'C#' },
  { id: 3, name: 'C++' },
  { id: 4, name: 'PHP' },
  { id: 5, name: 'Web Development' },
];

const fetchSkills = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return skillsData;
};

const addSkill = async (newSkill) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newId = skillsData.length + 1;
  const skillToAdd = { id: newId, name: newSkill };
  skillsData.push(skillToAdd);
  return skillToAdd;
};

function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchSkills().then(setSkills);
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      const addedSkill = await addSkill(newSkill);
      setSkills([...skills, addedSkill]);
      setNewSkill('');
    }
  };

  return ( 
    <div className="card">
      <h3>Skills Required</h3>
      <div className="tags">
        {skills.map((skill) => (
            <div key={skill.id} className="tag">{skill.name}</div>
        ))}
      </div>
      <form onSubmit={handleAddSkill} className="form">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          className="input"
        />
        <button type="submit" className="button">Add Skill</button>
      </form>
    </div>
  );
}

export default Skills;
