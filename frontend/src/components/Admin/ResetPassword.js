// components/ResetPassword.js
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../utils/auth';
import LOGO from '../../assets/logo.png';
import "./index.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!token || !email) {
      setError('Invalid reset link');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(email, token, newPassword, confirmPassword);
      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        switch (response.status) {
          case 400:
            if (data.message && data.message.includes('token')) {
              setError('Reset link has expired. Please request a new one.');
            } else {
              setError(data.message || 'Invalid request. Please check your details.');
            }
            break;
          default:
            setError(data.message || 'Password reset failed. Please try again.');
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Reset password error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="auth-container">
        <div className="auth-image"></div>
        <div className="auth-right-cont">
          <img src={LOGO} alt="logo" className="logo-img rel" />
          <div className="form-container">
            <div className="error-message">Invalid reset link</div>
            <button 
              className="auth-button" 
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className="auth-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel" />
        <h2 className="auth-head">RESET PASSWORD</h2>
        
        <form onSubmit={handleResetPassword} className="form-container">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <p className="reset-info">
            Resetting password for: <strong>{email}</strong>
          </p>
          
          <label>New Password</label>
          <input 
            type="password" 
            placeholder="Enter New Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
            disabled={loading}
          />
          
          <label>Confirm New Password</label>
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? "RESETTING..." : "RESET PASSWORD"}
          </button>
        </form>
        
        <p>
          Remember your password? 
          <span className="forgot-password" onClick={() => navigate('/login')}>
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;