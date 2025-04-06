import React, { useState } from "react";
import "./CManagement.css"; // Optional: For styling

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "City Hospital",
      type: "Hospital",
      contact: "0112345678",
      address: "Colombo",
    },
    {
      id: 2,
      name: "MediLab Diagnostics",
      type: "Diagnostic Lab",
      contact: "0771234567",
      address: "Galle",
    },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    type: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.type) {
      setCustomers([
        ...customers,
        { ...newCustomer, id: customers.length + 1 },
      ]);
      setNewCustomer({ name: "", type: "", contact: "", address: "" });
    }
  };

  return (
    <div className="customer-management">
      <h2>Customer Management</h2>

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
        <button type="submit">Add Customer</button>
      </form>

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
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.id}</td>
              <td>{cust.name}</td>
              <td>{cust.type}</td>
              <td>{cust.contact}</td>
              <td>{cust.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
