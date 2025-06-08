import React, { useState, useEffect } from 'react';
import { apiCall, logout } from '../utils/auth';
import "./index.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiCall('/users');
      
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAdmin = async (email, approve) => {
    try {
      const response = await apiCall(`/approve-admin?email=${encodeURIComponent(email)}&approve=${approve}`, {
        method: 'POST'
      });

      const data = await response.json();

      if (response.ok) {
        alert(approve ? 'Admin approved successfully!' : 'Admin rejected successfully!');
        fetchUsers();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      alert('Network error. Please try again.');
      console.error('Approve admin error:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const response = await apiCall(`/users/${userId}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
          alert('User deleted successfully!');
          fetchUsers();
        } else {
          alert(data.message || 'Failed to delete user');
        }
      } catch (err) {
        alert('Network error. Please try again.');
        console.error('Delete user error:', err);
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (user) => {
    if (!user.enabled) {
      return <span className="status-badge status-locked">Locked</span>;
    }
    
    if (user.roles === 'ROLE_ADMIN' && user.status === 'PENDING') {
      return <span className="status-badge status-pending">Pending</span>;
    }
    
    return <span className="status-badge status-approved">Approved</span>;
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users and system settings</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <div className="admin-section-header">
            <h3>User Management</h3>
          </div>
          <div className="admin-section-content">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="loading-spinner"></div>
                <p>Loading users...</p>
              </div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <>
                <p>Total Users: <strong>{users.length}</strong></p>
                <div style={{ overflowX: 'auto' }}>
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Enabled</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span style={{ 
                              color: user.roles === 'ROLE_ADMIN' ? '#dc3545' : '#28a745',
                              fontWeight: 'bold'
                            }}>
                              {user.roles === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td>{getStatusBadge(user)}</td>
                          <td>
                            <span style={{ color: user.enabled ? '#28a745' : '#dc3545' }}>
                              {user.enabled ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td>{formatDate(user.createdAt)}</td>
                          <td>
                            {user.roles === 'ROLE_ADMIN' && user.status === 'PENDING' && (
                              <>
                                <button 
                                  className="approve-btn"
                                  onClick={() => handleApproveAdmin(user.email, true)}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="reject-btn"
                                  onClick={() => handleApproveAdmin(user.email, false)}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {user.roles === 'ROLE_ADMIN' && user.status === 'APPROVED' && (
                              <span style={{ color: '#28a745', fontSize: '12px' }}>Approved</span>
                            )}
                            {user.roles === 'ROLE_ADMIN' && (
                              <button 
                                className="delete-btn"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <h3>System Statistics</h3>
          </div>
          <div className="admin-section-content">
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h4>Total Users</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#008000' }}>
                  {users.filter(u => u.roles === 'ROLE_USER').length}
                </p>
              </div>
              <div className="dashboard-card">
                <h4>Total Admins</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
                  {users.filter(u => u.roles === 'ROLE_ADMIN').length}
                </p>
              </div>
              <div className="dashboard-card">
                <h4>Pending Approvals</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                  {users.filter(u => u.roles === 'ROLE_ADMIN' && u.status === 'PENDING').length}
                </p>
              </div>
              <div className="dashboard-card">
                <h4>Active Users</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#17a2b8' }}>
                  {users.filter(u => u.enabled).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="admin-section-content">
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h4>Refresh User List</h4>
                <p>Update the user list with the latest data from the server.</p>
                <button className="auth-button" onClick={fetchUsers}>
                  Refresh
                </button>
              </div>
              <div className="dashboard-card">
                <h4>Back to Dashboard</h4>
                <p>Return to your main dashboard.</p>
                <a href="/dashboard" className="auth-button">
                  Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;