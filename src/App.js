import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import NavBar from "./Components/NavBar";  // "Components" and "Navbar" both need to match case
import Dashboard from "./Pages/Dashboard";
import Territory from "./Pages/Territory";
import VisitPlan from "./Pages/VisitPlan";
import CustomerManagement from "./Pages/CManagement";
import Reports from "./Pages/Reports";


import "./App.css";


function App() {
  return (
    <Router>
      <NavBar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Territory" element={<Territory />} />
        <Route path="/visit-Plan" element={<VisitPlan />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
