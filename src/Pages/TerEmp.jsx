import React from "react";
import "./TerEmp.css";

const TerEmp = () => {
  return (
    <div className="tae-container">
      <h2>Territory & Employee Management</h2>

      <div className="tae-section">
        <h3>Create Territory</h3>
        <form className="tae-form">
          <input type="text" placeholder="Territory Name" />
          <input type="text" placeholder="Region" />
          <button type="submit" className="tae-button">Create</button>
        </form>
      </div>

      <div className="tae-section">
        <h3>Manage Employees</h3>
        <form className="tae-form">
          <input type="text" placeholder="Employee Name" />
          <input type="text" placeholder="Role" />
          <input type="email" placeholder="Email" />
          <button type="submit" className="tae-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default TerEmp;
