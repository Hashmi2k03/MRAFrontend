import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginSignup.css";
import axios from "axios";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [orgOptions, setOrgOptions] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  useEffect(() => {
    // Simulate fetching orgs from API
    setTimeout(() => {
      setOrgOptions(["Company A", "Company B", "Company C"]);
    }, 500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (action === 'Signup' && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const endpoint =
      action === 'Login'
        ? 'http://localhost:3000/api/users/login'
        : 'http://localhost:3000/api/users/';

    const payload =
      action === 'Login'
        ? { email, password }
        : { name, email, password, phone, address, organization };

    try {
      const res = await axios.post(endpoint, payload);
      console.log(`${action} successful:`, res.data);

      if (action === 'Login') {
        setMessage('Login successful!');
        // localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        setMessage('Registration successful! You can now log in.');
        setAction('Login');
        // Optionally clear form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setAddress('');
        setOrganization('');
      }
    } catch (err) {
      console.error(`${action} failed:`, err);
      setError(err.response?.data?.message || 'Something went wrong.');
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
                value={phone}
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
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              >
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
