import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CManagement.css"; // Optional: For styling

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    type: "",
    contact: "",
    address: "",
  });

  // Fetch customers from the API when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://mrappbackend.onrender.com/api/povs/count");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Add a new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.type) {
      try {
        const response = await axios.post(
          "https://mrappbackend.onrender.com/api/povs/count", // Correct POST endpoint for creating a customer
          newCustomer,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setCustomers([...customers, response.data]); // Add the new customer to the list
        setNewCustomer({ name: "", type: "", contact: "", address: "" }); // Reset form
      } catch (error) {
        console.error("Error adding customer:", error);
        if (error.response) {
          console.error("API returned error status:", error.response.status);
          console.error("Error details:", error.response.data);
        }
      }
    }
  };

  return (
    <div className="customer-management">
      <h2>Point of Visit</h2>

      {/* Form to add new customer */}
      <form onSubmit={handleAddCustomer} className="customer-form">
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          value={newCustomer.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Hospital">Hospital</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Diagnostic Lab">Diagnostic Lab</option>
        </select>
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={newCustomer.contact}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Contact person"
          value={newCustomer.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Customer</button>
      </form>

      {/* Display customer list in a table */}
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Contact</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.id}</td>
                <td>{cust.name}</td>
                <td>{cust.type}</td>
                <td>{cust.contact}</td>
                <td>{cust.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No customers available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
