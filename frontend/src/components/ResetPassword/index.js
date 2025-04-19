import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import LOGO from '../../assets/logo.png';


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:3333/api/v1/reset-password", null, {
        params: {
          token,
          newPassword
        }
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Invalid or expired token. Please request a new password reset.");
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-right-cont">
          <img src={LOGO} alt="logo" className="logo-img rel" />
          <h2 className="auth-head">Password Reset Successful</h2>
          <p>Your password has been updated successfully. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className="auth-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel" />
        <h2 className="auth-head">Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleReset} className="form-container">
          <label>New Password</label>
          <input 
            type="password" 
            placeholder="Enter New Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            minLength="6"
            required 
          />
          <label>Confirm New Password</label>
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          <button type="submit">RESET PASSWORD</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;