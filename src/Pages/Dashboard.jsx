import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState({
    totalVisits: 0,
    territories: 0,
    customers: 0,
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [territoriesRes, customersRes] = await Promise.all([
          axios.get("https://mrappbackend.onrender.com/api/territories/count"),
          axios.get("https://mrappbackend.onrender.com/api/povs/count"),
        ]);

        setData({
          totalVisits: 0,
          territories: territoriesRes.data.count || 0,
          customers: customersRes.data.count || 0,
        });

        const customersList = await axios.get("https://mrappbackend.onrender.com/api/povs/");
        setCustomers(customersList.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

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
      </div>
      <div className="dashboard-customers">
        <h2>Customer List</h2>
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <table className="customer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
