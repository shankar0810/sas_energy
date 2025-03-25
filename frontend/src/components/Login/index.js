import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from '../../assets/logo.png';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login successful!");
    navigate("/"); // Adjust the path as needed
  };

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className="auth-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel" />
        <h2 className="auth-head">LOGIN</h2>
        <form onSubmit={handleLogin} className="form-container">
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Enter Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">LOGIN</button>
        </form>
        <p className="forgot-password" onClick={() => alert("Forgot Password Clicked")}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default Login;
