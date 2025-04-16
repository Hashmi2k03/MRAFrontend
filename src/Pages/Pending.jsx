import React, { useEffect, useState } from "react";
import "./pending.css";

const Pending = () => {
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [roleUpdates, setRoleUpdates] = useState({}); // track role updates by ID

  // Simulated API call with mock data
  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          organization: "Company A",
          role: "Medical Rep"
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          organization: "Company A",
          role: "Medical Rep"
        }
      ];
      setPendingEmployees(mockData);

      // Initialize roleUpdates with current roles
      const initialRoles = {};
      mockData.forEach((emp) => {
        initialRoles[emp._id] = emp.role;
      });
      setRoleUpdates(initialRoles);
    }, 500);
  }, []);

  const handleRoleChange = (id, newRole) => {
    setRoleUpdates((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleApprove = (id) => {
    const selectedRole = roleUpdates[id] || "Medical Rep";
    alert(`Approved employee ID: ${id} with role: ${selectedRole}`);
    setPendingEmployees((prev) => prev.filter((emp) => emp._id !== id));
  };

  const handleReject = (id) => {
    alert(`Rejected employee ID: ${id}`);
    setPendingEmployees((prev) => prev.filter((emp) => emp._id !== id));
  };

  return (
    <div className="pending-approvals">
      <h2>Pending Employee Approvals</h2>

      {pendingEmployees.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.organization}</td>
                <td>
                  <select
                    value={roleUpdates[emp._id] || emp.role}
                    onChange={(e) => handleRoleChange(emp._id, e.target.value)}
                  >
                    <option value="Medical Rep">Medical Rep</option>
                    <option value="Sales Rep">Sales Rep</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Manager">Manager</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleApprove(emp._id)}>Approve</button>
                  <button onClick={() => handleReject(emp._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Pending;
