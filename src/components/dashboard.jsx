import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by looking for the authToken in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to login page if no token is found
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove JWT from localStorage
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
