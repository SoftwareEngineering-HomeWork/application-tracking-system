import React, { useState, useEffect } from 'react';
import './MatchesPage.css';
import { FaFileAlt } from 'react-icons/fa'; // Make sure to install react-icons

// Updated dummy API function
const fetchMatches = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'John Doe', skills: ['JavaScript', 'React'], experience: 'Senior', location: 'Algeria', resumeUrl: 'https://example.com/resume1.pdf' },
    { id: 2, name: 'Jane Smith', skills: ['Python', 'Django'], experience: 'Mid-level', location: 'Angola', resumeUrl: 'https://example.com/resume2.pdf' },
    { id: 3, name: 'Bob Johnson', skills: ['Java', 'Spring'], experience: 'Junior', location: 'Algeria', resumeUrl: 'https://example.com/resume3.pdf' },
  ];
};

function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMatches = async () => {
      try {
        const fetchedMatches = await fetchMatches();
        setMatches(fetchedMatches);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch matches. Please try again later.');
        setLoading(false);
      }
    };

    getMatches();
  }, []);

  if (loading) return <div className="matches-page">Loading...</div>;
  if (error) return <div className="matches-page error">{error}</div>;

  return (
    <div className="matches-page">
      <h1>Recommended Candidates</h1>
      <div className="matches-list">
        {matches.map(match => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <h2>{match.name}</h2>
                <p>Experience: {match.experience}</p>
                <p>Skills: {match.skills.join(', ')}</p>
                <p>Location: {match.location}</p>
                <p>Resume: <a href={match.resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-link">
                <FaFileAlt />
              </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchesPage;
