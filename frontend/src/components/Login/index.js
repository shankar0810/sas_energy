import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from '../../assets/logo.png';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:3333/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userName', data.name);

        alert("Login successful!");
        navigate("/admin"); 
      } else {
        // Handle different error responses
        switch (response.status) {
          case 401:
            setError("Invalid email or password");
            break;
          case 403:
            // Handle different 403 scenarios based on the message
            if (data.message && data.message.includes("not verified")) {
              setError("Please verify your email by clicking the link in your inbox before logging in");
            } else if (data.message && data.message.includes("pending approval")) {
              setError("Admin account is pending approval. Please wait for admin approval.");
            } else if (data.message && data.message.includes("declined")) {
              setError("Admin account has been declined. Please contact support.");
            } else {
              setError(data.message || "Access forbidden. Please contact support.");
            }
            break;
          case 423:
            setError("Account is locked. Please contact support");
            break;
          default:
            setError(data.message || "Login failed. Please try again");
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/api/v1/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset link sent to your email! Please check your inbox.");
      } else {
        switch (response.status) {
          case 404:
            alert("Email not found in our system");
            break;
          case 403:
            alert("Please verify your email first");
            break;
          case 423:
            alert("Account is locked. Please contact support");
            break;
          default:
            alert(data.message || "Failed to send reset link");
        }
      }
    } catch (err) {
      alert("Network error. Please try again");
      console.error('Forgot password error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className="auth-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel" />
        <h2 className="auth-head">LOGIN</h2>
        <form onSubmit={handleLogin} className="form-container">
          {error && <div className="error-message">{error}</div>}
          
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading}
          />
          
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>
        
        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        
        <p>New User? <span className="forgot-password" onClick={() => navigate("/signup")}>Register Here</span></p>
      </div>
    </div>
  );
};

export default Login;