import React, { useState, useEffect } from 'react';
import './components.css';

// Dummy API functions
let locationsData = [
  { id: 1, name: 'Algeria' },
  { id: 2, name: 'Angola' },
  { id: 3, name: 'Argentina' },
  { id: 4, name: 'Australia' },
  { id: 5, name: 'Colombia' },
];

const fetchLocations = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return locationsData;
};

const addLocation = async (newLocation) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newId = locationsData.length + 1;
  const locationToAdd = { id: newId, name: newLocation };
  locationsData.push(locationToAdd);
  return locationToAdd;
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
          <div className="tag">{location.name}</div>
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