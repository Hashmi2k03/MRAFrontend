import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import NavBar from "./Components/NavBar";
import Dashboard from "./Pages/Dashboard";
import Territory from "./Pages/Territory";
import VisitPlan from "./Pages/VisitPlan";
import CustomerManagement from "./Pages/CManagement";
import Reports from "./Pages/Reports";
import AdminDash from "./Pages/AdminDash";
import TerEmp from "./Pages/TerEmp";
import Pending from "./Pages/Pending";
import "./App.css";
import AwaitingApproval from "./Pages/AwaitingApproval";
import LogVisit from "./Pages/LogVisit";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

// Separate component to handle conditional NavBar logic
function AppRoutes() {
  const location = useLocation();

  // Define routes where NavBar should be hidden (like login)
  const hideNavBarRoutes = ["/", "/LoginSignup"];

  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Territory" element={<Territory />} />
        <Route path="/visit-Plan" element={<VisitPlan />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/AdminDash" element={<AdminDash />} />
        <Route path="/TerEmp" element={<TerEmp />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/Unauthorised" element={<AwaitingApproval />} />
        <Route path="/VisitLogs" element={<LogVisit />} />
      </Routes>
    </>
  );
}

export default App;