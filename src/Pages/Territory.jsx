// src/pages/Territory.jsx
import React, { useState } from 'react';
import './Territory.css'; // Add styles for the Territory page

const Territory = () => {
  // Dummy data for territories
  const initialTerritories = [
    { id: 1, name: 'North Zone' },
    { id: 2, name: 'South Zone' },
    { id: 3, name: 'East Zone' },
    { id: 4, name: 'West Zone' },
  ];

  const [territories, setTerritories] = useState(initialTerritories);
  const [newTerritory, setNewTerritory] = useState("");

  // Function to handle adding a new territory
  const handleAddTerritory = () => {
    if (newTerritory) {
      const newId = territories.length + 1;
      setTerritories([...territories, { id: newId, name: newTerritory }]);
      setNewTerritory(""); // Clear the input after adding
    }
  };

  // Function to handle deleting a territory
  const handleDeleteTerritory = (id) => {
    setTerritories(territories.filter((territory) => territory.id !== id));
  };

  return (
    <div className="territory-container">
      <h1>Territories</h1>

      <div className="territory-list">
        <h2>Existing Territories</h2>
        <ul>
          {territories.map((territory) => (
            <li key={territory.id} className="territory-item">
              <span>{territory.name}</span>
              <button onClick={() => handleDeleteTerritory(territory.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-territory">
        <h2>Add New Territory</h2>
        <input
          type="text"
          value={newTerritory}
          onChange={(e) => setNewTerritory(e.target.value)}
          placeholder="Enter new territory name"
        />
        <button onClick={handleAddTerritory}>Add Territory</button>
      </div>
    </div>
  );
};

export default Territory;
