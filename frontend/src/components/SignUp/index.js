import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LOGO from '../../assets/logo.png';
import './index.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:3333/api/v1/register", {
        name,
        email,
        password,
        roles: "ROLE_ADMIN",
        status: "PENDING"
      });

      alert("Admin registration submitted for approval. You will receive an email when approved.");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-image"></div>
      <div className="sign-up-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel"/>
        <h2 className="sign-up-head">ADMIN REGISTRATION</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSignup} className="form-container">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter Password (min 6 characters)" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            minLength="6"
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
        <p>Already have an account? <span className="forgot-password" onClick={() => navigate("/login")}>Login Here</span></p>
      </div>
    </div>
  );
};

export default Signup;