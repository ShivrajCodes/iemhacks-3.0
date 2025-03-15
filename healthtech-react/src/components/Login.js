import React, { useState } from "react";

const Login = ({ setIsAuthenticated, setShowSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsAuthenticated(true);
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to HealthTech</h1>
      <p>Your partner in health and wellness.</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>New user? <a href="#" onClick={() => setShowSignup(true)}>Sign up here</a></p>
    </div>
  );
};

export default Login;
