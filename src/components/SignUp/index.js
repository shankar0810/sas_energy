import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from '../../assets/logo.png';
import './index.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Signup successful! Redirecting to login.");
    navigate("/login");
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-image"></div>
      <div className="sign-up-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel"/>
        <h2 className="sign-up-head">SIGN UP</h2>
        <form onSubmit={handleSignup} className="form-container">
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
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Re-enter Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <button type="submit">REGISTER</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
