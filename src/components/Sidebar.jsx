import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-info">
          <img 
            src="https://storage.googleapis.com/a1aa/image/sX6o1TQgGtzNwKhr7EWyRARW06ClBO1Rx4wkO0HKxPQ.jpg" 
            alt="User profile picture" 
            className="profile-img" 
          />
          <div className="user-details">
            <p className="user-name">NAME SURNAME</p>
            <p className="user-meta">Male, 25 years</p>
          </div>
        </div>
        <a href="#" className="edit-link">EDIT</a>
      </div>
      
      <div className="measurements">
        <div className="measurement">
          <p className="measurement-label">HEIGHT</p>
          <p className="measurement-value">
            170
            <span className="measurement-unit">cm</span>
          </p>
        </div>
        <div className="measurement">
          <p className="measurement-label">WEIGHT</p>
          <p className="measurement-value">
            70
            <span className="measurement-unit">kg</span>
          </p>
        </div>
      </div>
      
      <nav className="navigation">
        <a href="#" className="nav-link">
          <i className="fas fa-home nav-icon"></i>
          Home
        </a>
        <a href="#" className="nav-link">
          <i className="fas fa-chart-line nav-icon"></i>
          Statistics
        </a>
        <a href="#" className="nav-link">
          <i className="fas fa-cog nav-icon"></i>
          Settings
        </a>
        <a href="#" className="nav-link">
          <i className="fas fa-users nav-icon"></i>
          Join Community
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;

// CSS Styles
const styles = `
  .sidebar {
    background-color: #ffffff;
    width: 100%;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }
  
  .user-profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .profile-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e5e7eb;
  }
  
  .user-details {
    margin-left: 16px;
  }
  
  .user-name {
    font-weight: bold;
    font-size: 18px;
    color: #1f2937;
    margin: 0;
  }
  
  .user-meta {
    color: #6b7280;
    font-size: 14px;
    margin: 4px 0 0;
  }
  
  .edit-link {
    color: #10b981;
    font-weight: bold;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s ease;
  }
  
  .edit-link:hover {
    color: #059669;
  }
  
  .measurements {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    background-color: #f9fafb;
    padding: 16px;
    border-radius: 12px;
  }
  
  .measurement {
    text-align: center;
  }
  
  .measurement-label {
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .measurement-value {
    font-weight: bold;
    font-size: 24px;
    color: #1f2937;
    margin: 0;
  }
  
  .measurement-unit {
    font-size: 14px;
    color: #6b7280;
    margin-left: 4px;
  }
  
  .navigation {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    color: #374151;
    text-decoration: none;
    padding: 12px;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .nav-link:hover {
    background-color: #f3f4f6;
    color: #10b981;
  }
  
  .nav-icon {
    margin-right: 12px;
    font-size: 18px;
    width: 24px;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .sidebar {
      width: 300px;
    }
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);