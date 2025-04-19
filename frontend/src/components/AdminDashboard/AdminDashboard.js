import React from 'react';
import { useAuth } from '../utils/authContext';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Create this CSS file for styling

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <p>Welcome, {user?.email}</p>
        
        <nav>
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/users">User Management</Link></li>
            <li><Link to="/admin/projects">Project Management</Link></li>
            <li><Link to="/admin/services">Service Management</Link></li>
            <li><Link to="/admin/content">Content Management</Link></li>
            <li><button onClick={logout} className="logout-btn">Logout</button></li>
          </ul>
        </nav>
      </div>

      <div className="admin-content">
        <h1>Dashboard Overview</h1>
        
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>24</p> {/* Replace with dynamic data */}
          </div>
          
          <div className="stat-card">
            <h3>Active Projects</h3>
            <p>8</p> {/* Replace with dynamic data */}
          </div>
          
          <div className="stat-card">
            <h3>Services Offered</h3>
            <p>6</p> {/* Replace with dynamic data */}
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>New user registered - 2 hours ago</li>
            <li>Project "Solar Farm" updated - 5 hours ago</li>
            <li>New service added - 1 day ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;