// src/pages/VisitPlan.jsx
import React, { useState } from 'react';
import './VisitPlan.css'; // Add styles for the Visit Plan page

const VisitPlan = () => {
  // Dummy data for visit plans
  const initialPlans = [
    { id: 1, date: '2025-04-10', doctor: 'Dr. John Doe', location: 'North Hospital' },
    { id: 2, date: '2025-04-12', doctor: 'Dr. Jane Smith', location: 'South Clinic' },
  ];

  const [plans, setPlans] = useState(initialPlans);
  const [newPlan, setNewPlan] = useState({
    date: '',
    doctor: '',
    location: '',
  });

  // Function to handle adding a new visit plan
  const handleAddPlan = () => {
    if (newPlan.date && newPlan.doctor && newPlan.location) {
      const newId = plans.length + 1;
      setPlans([...plans, { id: newId, ...newPlan }]);
      setNewPlan({ date: '', doctor: '', location: '' }); // Clear the form
    }
  };

  // Function to handle deleting a visit plan
  const handleDeletePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  return (
    <div className="visit-plan-container">
      <h1>Visit Plan</h1>

      <div className="visit-plan-list">
        <h2>Existing Visit Plans</h2>
        <ul>
          {plans.map((plan) => (
            <li key={plan.id} className="visit-plan-item">
              <div className="plan-details">
                <span>{plan.date}</span>
                <span>{plan.doctor}</span>
                <span>{plan.location}</span>
              </div>
              <button onClick={() => handleDeletePlan(plan.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-visit-plan">
        <h2>Add New Visit Plan</h2>
        <input
          type="date"
          value={newPlan.date}
          onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
          placeholder="Visit Date"
        />
        <input
          type="text"
          value={newPlan.doctor}
          onChange={(e) => setNewPlan({ ...newPlan, doctor: e.target.value })}
          placeholder="Doctor's Name"
        />
        <input
          type="text"
          value={newPlan.location}
          onChange={(e) => setNewPlan({ ...newPlan, location: e.target.value })}
          placeholder="Location"
        />
        <button onClick={handleAddPlan}>Add Visit Plan</button>
      </div>
    </div>
  );
};

export default VisitPlan;
