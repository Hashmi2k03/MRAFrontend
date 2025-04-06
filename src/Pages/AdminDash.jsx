import React from "react";
import "./AdminDash.css";

const AdminDash = () => {
  return (
    <div className="admin-page">
      <div className="admin-form-container">
        <h2 className="admin-title">Admin Portal</h2>
        <form className="admin-form">
          <label htmlFor="orgName">Organization Name</label>
          <input type="text" id="orgName" name="orgName" placeholder="Enter organization name" />

          <label htmlFor="adminName">Admin Name</label>
          <input type="text" id="adminName" name="adminName" placeholder="Enter admin name" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminDash;
