import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import axios from "axios";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [orgOptions, setOrgOptions] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [organisation, setorganisation] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await axios.get(
          "https://mrappbackend.onrender.com/api/org/"
        );
        setOrgOptions(response.data.map((org) => org.name)); // Assuming the API returns an array of organisations
      } catch (error) {
        console.error("Error fetching organisations:", error);
      }
    };

    fetchOrgs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (action === "Signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const endpoint =
      action === "Login"
        ? "http://localhost:3000/api/users/login"
        : action === "Signup User"
        ? "http://localhost:3000/api/users/"
        : "http://localhost:3000/api/org/";

    const payload =
      action === "Login"
        ? { email, password }
        : action === "Signup User"
        ? { name, email, password, number, address, organisation }
        : { name, email, password, number, address };

    try {
      const res = await axios.post(endpoint, payload);
      console.log(`${action} successful:`, res.data);

      if (action === "Login") {
        setMessage("Login successful!");
        localStorage.setItem("userRole", res.data.role);
        if (res.data.role === "admin") {
          localStorage.setItem("organisation", res.data.name);
        }
        else {
          localStorage.setItem("organisation", res.data.organisation);
        }
        console.log("organisation:", localStorage.getItem("organisation")); // for debugging
        console.log("User Role:", res.data.role); // for debugging
        if (res.data.role === "admin" || res.data.role === "user") {
          navigate("/dashboard");
        } else {
          navigate("/Unauthorised");
        }
      } else {
        setMessage("Registration successful! You can now log in.");
        setAction("Login");
        // Optionally clear form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        setAddress("");
        setorganisation("");
      }
    } catch (err) {
      console.error(`${action} failed:`, err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="toggle">
          <button
            className={action === "Login" ? "active" : ""}
            onClick={() => setAction("Login")}
          >
            Login
          </button>
          <button
            className={action === "Signup" ? "active" : ""}
            onClick={() => setAction("Signup User")}
          >
            Signup
          </button>
        </div>

        {(action === "Signup User" || action === "Signup Organisation") && (
          <div className="toggle">
            <button
              className={action === "Signup User" ? "active" : ""}
              onClick={() => setAction("Signup User")}
            >
              Signup User
            </button>
            <button
              className={action === "Signup Organisation" ? "active" : ""}
              onClick={() => setAction("Signup Organisation")}
            >
              Signup organisation
            </button>
          </div>
        )}

        <h2>{action}</h2>

        <form onSubmit={handleSubmit}>
          {action === "Signup User" && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password Again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <select
                value={organisation}
                onChange={(e) => setorganisation(e.target.value)}
                required
              >
                <option value="">Select organisation</option>
                {orgOptions.map((org, index) => (
                  <option key={index} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </>
          )}

          {action === "Signup Organisation" && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password Again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </>
          )}

          {action === "Login" && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="submit-btn">
            {action}
          </button>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
