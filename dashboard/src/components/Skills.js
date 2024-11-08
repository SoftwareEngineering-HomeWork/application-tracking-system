import React, { useState, useEffect } from 'react';
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
  const response = await fetch('http://localhost:5001/recruiter/skills');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const addSkill = async (newSkill) => {

  const response = await fetch('http://localhost:5001/recruiter/skills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({newSkill})
  });

  if (!response.ok) {
    throw new Error('Failed to add skill');
  }

  return newSkill;
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
            <div key={skill} className="tag">{skill}</div>
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
