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
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [visitForm, setVisitForm] = useState({
    visitID: "",
    visitDate: "",
    notes: "",
    userID: "644f1b3c5f9c1e001c8e4d3b", // Example user ID
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [logVisitsRes, territoriesRes, customersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/visitLogs"),
          axios.get("http://localhost:3000/api/territories/count"),
          axios.get("http://localhost:3000/api/povs/count"),
        ]);

        setData({
          totalVisits: logVisitsRes.data.count || 0,
          territories: territoriesRes.data.count || 0,
          customers: customersRes.data.count || 0,
        });

        const customersList = await axios.post("http://localhost:3000/api/povs/", { organisation: localStorage.getItem("organisation") });
        setCustomers(customersList.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogVisit = (customer) => {
    setSelectedCustomer(customer);
    setShowPopup(true);
  };

  const handleSubmitVisit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    const payload = {
      visitID: visitForm.visitID,
      visitDate: new Date(visitForm.visitDate),
      notes: visitForm.notes,
      userID: visitForm.userID,
      povID: selectedCustomer._id,
    };

    try {
      await axios.post("http://localhost:3000/api/visitLogs", payload);
      alert("Visit logged successfully!");
      setShowPopup(false);
      setVisitForm({
        visitID: "",
        visitDate: "",
        notes: "",
        userID: visitForm.userID,
      });
    } catch (error) {
      console.error("Error logging visit:", error);
      alert("Failed to log visit.");
    }
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.number}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleLogVisit(customer);
                      }}
                    >
                      Log Visit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Log Visit for {selectedCustomer.name}</h3>
            <form onSubmit={handleSubmitVisit}>
              <label>
                Visit Date:
                <input
                  type="datetime-local"
                  value={visitForm.visitDate}
                  onChange={(e) => setVisitForm({ ...visitForm, visitDate: e.target.value })}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  value={visitForm.notes}
                  onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
                  required
                />
              </label>
              <div className="popup-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
