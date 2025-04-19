import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import './AdminStyles.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3333/api/v1/getallusers');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const approveAdmin = async (email) => {
    try {
      await axios.post('http://localhost:3333/api/v1/approveAdmin', null, {
        params: {
          email: email,
          approve: true
        }
      });
      
      // Update the user status in local state
      setUsers(users.map(user => 
        user.email === email ? { ...user, status: 'APPROVED' } : user
      ));
    } catch (error) {
      setError('Failed to approve admin');
      console.error('Approval error:', error);
    }
  };

  if (loading) return <div className="admin-loading">Loading users...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-content">
      <h1>User Management</h1>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>{user.status}</td>
              <td>
                {user.roles.includes('ROLE_ADMIN') && user.status === 'PENDING' && (
                  <button 
                    onClick={() => approveAdmin(user.email)}
                    className="admin-btn success"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;