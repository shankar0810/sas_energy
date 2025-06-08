import React from 'react';
import { getUserName, getUserEmail, getUserRole, logout } from '../utils/auth';
import "./index.css";

const Dashboard = () => {
  const userName = getUserName();
  const userEmail = getUserEmail();
  const userRole = getUserRole();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {userName}!</h1>
        <p>Your Solar Energy Dashboard</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card user-info-card">
          <h3>Account Information</h3>
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Email:</strong> {userEmail}</p>
          <p><strong>Role:</strong> {userRole === 'ROLE_ADMIN' ? 'Administrator' : 'User'}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Our Projects</h3>
          <p>Check out our completed solar installations and success stories from satisfied customers across the region.</p>
          <a href="/projects" className="auth-button">
            View Projects
          </a>
        </div>

        <div className="dashboard-card">
          <h3>Gallery</h3>
          <p>Browse through our collection of solar installations, equipment, and project photos.</p>
          <a href="/galleryupload" className="auth-button">
            View Gallery
          </a>
        </div>
      </div>

      {userRole === 'ROLE_ADMIN' && (
        <div className="dashboard-card" style={{ marginTop: '20px', border: '2px solid #dc3545' }}>
          <h3 style={{ color: '#dc3545' }}>Admin Panel</h3>
          <p>Access administrative features including user management and system settings.</p>
          <a href="/admin" className="auth-button" style={{ backgroundColor: '#dc3545' }}>
            Admin Panel
          </a>
        </div>
      )}
    </div>
  );
};

export default Dashboard;