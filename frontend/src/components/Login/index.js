import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LOGO from '../../assets/logo.png';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("http://localhost:3333/api/v1/login", {
        email,
        password
      });

      // Save token and user data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userEmail", email);

      // Redirect based on role
      if (response.data.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }
    
    try {
      await axios.post("http://localhost:3333/api/v1/forgot-password", null, {
        params: { email }
      });
      navigate("/forgot-password-confirmation", { state: { email } });
    } catch (err) {
      alert("Failed to send reset link. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className="auth-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel" />
        <h2 className="auth-head">ADMIN LOGIN</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="form-container">
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
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">LOGIN</button>
        </form>
        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <p>New Admin? <span className="forgot-password" onClick={() => navigate("/signup")}>Register Here</span></p>
      </div>
    </div>
  );
};

export default Login;