// src/pages/Dashboard.jsx
import React from "react";
import "./Dashboard.css"; // You can style the dashboard using CSS

const Dashboard = () => {
  // Dummy data for the dashboard
  const data = {
    totalVisits: 120,
    territories: 15,
    customers: 250,
    salesManagers: 5,
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className="dashboard-card">
          <h2>Total Visits</h2>
          <p>{data.totalVisits}</p>
        </div>
        <div className="dashboard-card">
          <h2>Territories</h2>
          <p>{data.territories}</p>
        </div>
        <div className="dashboard-card">
          <h2>Customers</h2>
          <p>{data.customers}</p>
        </div>
        <div className="dashboard-card">
          <h2>Sales Managers</h2>
          <p>{data.salesManagers}</p>
        </div>
      </div>
      <div className="dashboard-chart">
        {/* Add a chart or graphs here */}
        <h2>Sales Performance Chart (Dummy Data)</h2>
        <div className="chart-placeholder">
          <p>Chart goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
