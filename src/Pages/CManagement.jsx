import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CManagement.css"; // Optional: For styling

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    povType: "",
    number: "",
    address: "",
    contactPerson: "",
    organisation: localStorage.getItem("organization"),
  });
  const [territories, setTerritories] = useState([]); // State to hold territories

  // Fetch customers from the API when the component mounts
  useEffect(() => {
    fetchCustomers();
    fetchTerritories(); // Fetch territories when the component mounts
  }, []);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const organisation = localStorage.getItem("organization");
      const response = await axios.post("http://localhost:3000/api/povs", {
        organisation,
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchTerritories = async () => {
    try {
      const organisation = localStorage.getItem("organization");
      const response = await axios.post(
        "http://localhost:3000/api/territories",
        {
          organisation,
        }
      );
      setTerritories(response.data);
    } catch (error) {
      console.error("Error fetching territories:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Add a new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.povType) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/povs/createPOV", // Correct POST endpoint for creating a customer
          newCustomer,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setCustomers([...customers, response.data]); // Add the new customer to the list
        setNewCustomer({
          name: "",
          povType: "",
          number: "",
          address: "",
          contactPerson: "",
        }); // Reset form
      } catch (error) {
        console.error("Error adding customer:", error);
        if (error.response) {
          console.error("API returned error status:", error.response.status);
          console.error("Error details:", error.response.data);
        }
      }
    }
  };

  const handleDeletePOV = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/povs/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Error deleting POV:", error);
    }
  };

  const handleTagTerritory = async (name, territory) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/povs/updateTaggedTerritory",
        {
          povName: name,
          territoryName: territory,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Territory tagged successfully:", response.data);
      // Optionally, you can refresh the customer list or update the state here
    } catch (error) {
      console.error("Error tagging territory:", error);
    }
  }

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
          name="povType"
          value={newCustomer.povType}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Doctor">Doctor</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Distributor">Distributor</option>
        </select>
        <input
          type="text"
          name="number"
          placeholder="Contact Number"
          value={newCustomer.number}
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
          name="contactPerson"
          placeholder="Contact person"
          value={newCustomer.contactPerson}
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
              <tr key={cust._id}>
                <td>{cust.povID}</td>
                <td>{cust.name}</td>
                <td>{cust.povType}</td>
                <td>{cust.number}</td>
                <td>{cust.address}</td>
                <td>
                  <select
                    value={cust.povType}
                    onChange={(e) =>
                      handleTagTerritory(cust.name, e.target.value)
                    }
                  >
                    <option key="" value="">
                      Select Territory
                    </option>
                    {territories.map((type) => (
                      <option
                        key={type.territoryName}
                        value={type.territoryName}
                      >
                        {type.territoryName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeletePOV(cust._id)}>
                    Delete
                  </button>
                </td>
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
