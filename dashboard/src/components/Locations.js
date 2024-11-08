import React, { useState, useEffect } from 'react';
import './components.css';

// let locationsData = [
//   { id: 1, name: 'Algeria' },
//   { id: 2, name: 'Angola' },
//   { id: 3, name: 'Argentina' },
//   { id: 4, name: 'Australia' },
//   { id: 5, name: 'Colombia' },
// ];

const fetchLocations = async () => {
  const response = await fetch('http://localhost:5001/recruiter/locations');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  let result=await response.json();
  return result;

};

const addLocation = async (newLocation) => {

  const response = await fetch('http://localhost:5001/recruiter/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({newLocation})
  });

  if (!response.ok) {
    throw new Error('Failed to add location');
  }

  return newLocation;
};

function Locations() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  const handleAddLocation = async (e) => {
    e.preventDefault();
    if (newLocation.trim()) {
      const addedLocation = await addLocation(newLocation);
      setLocations([...locations, addedLocation]);
      setNewLocation('');
    }
  };

  return (
    <div className="card">
      <h3>Locations Required</h3>
      <div className="tags">
        {locations.map((location) => (
          <div key={location.name} className="tag">{location}</div>
        ))}
      </div>
      <form onSubmit={handleAddLocation} className="form">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Add a new location"
          className="input"
        />
        <button type="submit" className="button">Add Location</button>
      </form>
    </div>
  );
}

export default Locations;