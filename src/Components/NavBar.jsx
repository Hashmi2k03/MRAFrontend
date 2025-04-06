// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // You can style the navbar using CSS or Tailwind

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Medical CRM</h2>
      </div>
      <div className="navbar-links">
        <Link to="/LoginSignup" className="navbar-link">Login</Link>
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/territory" className="navbar-link">Territory</Link>
        <Link to="/visit-plan" className="navbar-link">Visit Plan</Link>
        <Link to="/customer-management" className="navbar-link">Customer Management</Link>
        <Link to="/reports" className="navbar-link">Reports</Link>
      </div>
    </nav>
  );
};

export default Navbar;
