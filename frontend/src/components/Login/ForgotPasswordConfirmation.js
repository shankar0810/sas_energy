import React from 'react';
import { useLocation } from 'react-router-dom';
import LOGO from '../../assets/logo.png';
import './index.css';

const ForgotPasswordConfirmation = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <div className="auth-container">
      <div className="auth-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel" />
        <h2 className="auth-head">Password Reset Sent</h2>
        <p>We've sent a password reset link to {email}.</p>
        <p>Please check your inbox and follow the instructions.</p>
        <p>Didn't receive the email? Check your spam folder or try again.</p>
      </div>
    </div>
  );
};

export default ForgotPasswordConfirmation;