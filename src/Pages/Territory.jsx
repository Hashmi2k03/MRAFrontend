// src/pages/Territory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Territory.css';

const Territory = () => {
  const [territories, setTerritories] = useState([]);
  const [newTerritoryName, setNewTerritoryName] = useState("");

  // Fetch territories from the API when the component mounts
  useEffect(() => { fetchTerritories(); }, []);

  // Fetch all territories
  const fetchTerritories = async () => {
    try {
      const organisation = localStorage.getItem("organization");
      const response = await axios.post('http://localhost:3000/api/territories', { organisation });
      setTerritories(response.data);
    } catch (error) {
      console.error('Error fetching territories:', error);
    }
  };

  // Add a new territory
  const handleAddTerritory = async () => {
    if (newTerritoryName.trim()) {
      try {
        const organisation = localStorage.getItem("organization");
        console.log("Organisation:", organisation); // for debugging
        const newTerritory = {    
          territoryName: newTerritoryName,
          organisation: organisation   
        };

        const response = await axios.post(
          'http://localhost:3000/api/territories/createTerritory',
          newTerritory,
          { headers: { 'Content-Type': 'application/json' } }
        );

        setTerritories([...territories, response.data]);
        setNewTerritoryName("");
      } catch (error) {
        console.error('Error adding territory:', error);
      }
    }
  };

  // Delete a territory
  const handleDeleteTerritory = async (id) => {
    try {
      await axios.delete(`https://mrappbackend.onrender.com/api/territories/${id}`);
      setTerritories(territories.filter((territory) => territory._id !== id));
    } catch (error) {
      console.error('Error deleting territory:', error);
    }
  };

  return (
    <div className="territory-container">
      <h1>Territories</h1>

      <div className="territory-list">
        <h2>Existing Territories</h2>
        <ul>
          {territories.map((territory) => (
            <li key={territory._id} className="territory-item">
              <span>{territory.territoryName}</span>
              <button onClick={() => handleDeleteTerritory(territory._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-territory">
        <h2>Add New Territory</h2>
        <input
          type="text"
          value={newTerritoryName}
          onChange={(e) => setNewTerritoryName(e.target.value)}
          placeholder="Enter new territory name"
        />
        <button onClick={handleAddTerritory}>Add Territory</button>
      </div>
    </div>
  );
};

export default Territory;
