import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './components.css';

// Dummy API functions
let skillsData = [
  { id: 1, name: 'JavaScript', link: '/application-page' },
  { id: 2, name: 'C#', link: '/csharp-page' },
  { id: 3, name: 'C++', link: '/cpp-page' },
  { id: 4, name: 'PHP', link: '/php-page' },
  { id: 5, name: 'Web Development', link: '/web-dev-page' },
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
  const skillToAdd = { id: newId, name: newSkill, link: `/${newSkill.toLowerCase().replace(' ', '-')}-page` };
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
      <h3>Skills required</h3>
      <div className="tags">
        {skills.map((skill) => (
            <div className="tag">{skill.name}</div>
        ))}
      </div>
      <form onSubmit={handleAddSkill} className="skills-form">
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
