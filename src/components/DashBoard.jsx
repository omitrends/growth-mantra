import React from 'react';
import './DashBoard.css'; // You'll need to create this CSS file separately

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
      
      {/* Main Content */}
      <div className="main-content">
        <div className="category-cards">
          <div className="category-card fitness">
            <i className="fas fa-dumbbell card-icon"></i>
            <span className="card-label">FITNESS</span>
          </div>
          <div className="category-card mental">
            <i className="fas fa-brain card-icon"></i>
            <span className="card-label">MENTAL WELLBEING</span>
          </div>
          <div className="category-card nutrition">
            <i className="fas fa-utensils card-icon"></i>
            <span className="card-label">NUTRITION</span>
          </div>
        </div>
        
        <div className="progress-section">
          <p className="section-title">TRACK YOUR PROGRESS</p>
          <div className="progress-container">
            {/* Content for tracking progress goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;