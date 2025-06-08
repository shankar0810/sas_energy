// components/EmailVerification.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../utils/auth';
import LOGO from '../../assets/logo.png';
import "./index.css";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    const performVerification = async () => {
      try {
        const response = await verifyEmail(token, email);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Email verified successfully! You can now login.');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network error. Please try again.');
        console.error('Verification error:', error);
      }
    };

    performVerification();
  }, [searchParams, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-image"></div>
      <div className="auth-right-cont">
        <img src={LOGO} alt="logo" className="logo-img rel" />
        <h2 className="auth-head">EMAIL VERIFICATION</h2>
        
        <div className="form-container">
          {status === 'verifying' && (
            <div className="verification-status">
              <div className="loading-spinner"></div>
              <p>Verifying your email...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="verification-status">
              <div className="success-message">{message}</div>
              <p>Redirecting to login...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="verification-status">
              <div className="error-message">{message}</div>
              <button 
                className="auth-button" 
                onClick={() => navigate('/login')}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;