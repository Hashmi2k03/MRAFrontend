import React, { useState, useEffect } from "react";
import './LoginSignup.css';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [orgOptions, setOrgOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    organization: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setOrgOptions(["Company A", "Company B", "Company C"]);
    }, 500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submit logic goes here (this is just UI-related code)
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
            onClick={() => setAction("Signup")}
          >
            Signup
          </button>
        </div>

        <h2>{action}</h2>

        <form onSubmit={handleSubmit}>
          {action === "Signup" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Password Again"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                required
              />
              <select name="organization" onChange={handleChange} required>
                <option value="">Select Organization</option>
                {orgOptions.map((org, index) => (
                  <option key={index} value={org}>
                    {org}
                  </option>
                ))}
              </select>
            </>
          )}

          {action === "Login" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit" className="submit-btn">
            {action}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
