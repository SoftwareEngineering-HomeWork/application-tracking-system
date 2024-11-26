import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SWEListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5002/swe-lists', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
          },
        });
        const { companies, roles, locations, application_links } = response.data;
        
        const formattedListings = companies.map((company, index) => ({
          company,
          role: roles[index],
          location: locations[index],
          applicationLink: application_links[index],
        }));

        setListings(formattedListings);
        setLoading(false);
      } catch (err) {
        console.log("error:", err)
        setError('Failed to fetch listings');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', marginLeft: '20px' }}>
      <h2 style={{ color: '#333' }}>Software Engineering Internships</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Company</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Role</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Location</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Apply</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{listing.company}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{listing.role}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{listing.location}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <a href={listing.applicationLink} target="_blank" rel="noopener noreferrer">
                  Apply
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SWEListings;
