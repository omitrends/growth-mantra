import React from 'react';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken'); //clear JWT
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
