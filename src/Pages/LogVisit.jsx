// filepath: c:\Users\Abdul Muiz\VSProjects\MRAFrontend\src\Pages\LogVisit.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LogVisit.css";

const LogVisit = () => {
  const [visitLogs, setVisitLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = "644f1b3c5f9c1e001c8e4d3b"; // replace with dynamic ID if available

  useEffect(() => {
    const fetchVisitLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/visitLogs");
        const allLogs = response.data || [];
        // const userLogs = allLogs.filter(log => log.userID === userId); 
        setVisitLogs(allLogs);
      } catch (error) {
        console.error("Failed to fetch visit logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitLogs();
  }, []);

  return (
    <div className="log-visit-container">
      <h1>My Visit Logs</h1>
      {loading ? (
        <p>Loading visits...</p>
      ) : visitLogs.length === 0 ? (
        <p>No visits found.</p>
      ) : (
        <table className="visit-log-table">
          <thead>
            <tr>
              <th>Visit ID</th>
              <th>Customer ID</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {visitLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.visitID || log._id}</td>
                <td>{log.povID}</td>
                <td>{new Date(log.visitDate).toLocaleString()}</td>
                <td>{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogVisit;