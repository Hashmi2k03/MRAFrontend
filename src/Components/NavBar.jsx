import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  const userRole = localStorage.getItem("userRole"); // "admin", "manager", or "user"
  console.log("User Role:", userRole); // for debugging

  const renderLinks = () => {
    if (userRole === "admin") {
      return (
        <>
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/territory" className="navbar-link">Territory</Link>
          <Link to="/pending" className="navbar-link">Approvals</Link>
          <Link to="/customer-management" className="navbar-link">Customer Management</Link>
          <Link to="/AdminDash" className="navbar-link">Organization</Link>
        </>
      );
    } else if (userRole === "manager") {
      return (
        <>
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/territory" className="navbar-link">Territory</Link>
          <Link to="/VisitLogs" className="navbar-link">Visit Logs</Link>
          <Link to="/reports" className="navbar-link">Reports</Link>
        </>
      );
    } else if (userRole === "user") {
      // default: regular user
      return (
        <>
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/VisitLogs" className="navbar-link">Visit Logs</Link>
          <Link to="/customer-management" className="navbar-link">Customer Management</Link>
        </>
      );
    }
    else {
      return null; // No links for other roles or if not logged in
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Medical CRM</h2>
      </div>
      <div className="navbar-links">
        {renderLinks()}
        <Link to="/LoginSignup" className="navbar-link">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;