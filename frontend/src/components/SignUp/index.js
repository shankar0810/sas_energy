import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from '../../assets/logo.png';
import './index.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Password should be at least 8 characters with uppercase, lowercase, number, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Please check your email for verification link.");
        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        // Handle different error responses
        switch (response.status) {
          case 409:
            setError("Email already exists. Please use a different email");
            break;
          case 400:
            setError(data.message || "Invalid input. Please check your details");
            break;
          default:
            setError(data.message || "Registration failed. Please try again");
        }
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again");
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-image"></div>
      <div className="sign-up-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel"/>
        <h2 className="sign-up-head">SIGN UP</h2>
        <form onSubmit={handleSignup} className="form-container">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            disabled={loading}
          />
          
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
          
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Re-enter Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            disabled={loading}
          />
          
          <label>Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="role-select"
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
          
          <button type="submit" disabled={loading}>
            {loading ? "REGISTERING..." : "REGISTER"}
          </button>
        </form>
        
        <p>Already have an account? <span className="forgot-password" onClick={() => navigate("/login")}>Login Here</span></p>
      </div>
    </div>
  );
};

export default Signup;