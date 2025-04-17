import React, { useEffect, useState } from "react";
import "./pending.css";
import axios from "axios";

const Pending = () => {
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [roleUpdates, setRoleUpdates] = useState({});

  useEffect(() => {
    const fetchPendingEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        const data = response.data;
        setPendingEmployees(data);

        const initialRoles = {};
        data.forEach((emp) => {
          initialRoles[emp._id] = emp.role;
        });
        setRoleUpdates(initialRoles);
      } catch (error) {
        console.error("Error fetching pending employees:", error);
      }
    };

    fetchPendingEmployees();
  }, []);

  const handleRoleChange = (id, newRole) => {
    setRoleUpdates((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleApprove = async (id) => {
    const selectedRole = roleUpdates[id] || "user";

    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, {
        role: selectedRole,
        status: "approved",
      });

      alert(`Approved employee ID: ${id} with role: ${selectedRole}`);
    } catch (error) {
      console.error("Error approving employee:", error);
      alert("Failed to approve employee. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      alert(`Rejected and deleted employee ID: ${id}`);
      setPendingEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error rejecting/deleting employee:", error);
      alert("Failed to reject employee. Please try again.");
    }
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
              <th>Organisation</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.organisation}</td>
                <td>
                  {emp.role ? (
                    <span>
                      {emp.role === "user" ? "Medical Rep" : "Manager"}
                    </span>
                  ) : (
                    <select
                      value={roleUpdates[emp._id] || ""}
                      onChange={(e) =>
                        handleRoleChange(emp._id, e.target.value)
                      }
                    >
                      <option value="">Select Role</option>
                      <option value="user">Medical Rep</option>
                      <option value="manager">Manager</option>
                    </select>
                  )}
                </td>
                <td>
                  {emp.role ? (
                    <span className="approved-label">Approved</span>
                  ) : (
                    <>
                      <button onClick={() => handleApprove(emp._id)}>
                        Approve
                      </button>
                      <button onClick={() => handleReject(emp._id)}>
                        Reject
                      </button>
                    </>
                  )}
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
