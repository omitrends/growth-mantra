import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import profileImage from '../assets/images/profile.png';

const Sidebar = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items configuration
  const navigationItems = [
    { 
      path: '/dashboard', 
      label: 'Home', 
      icon: '🏠',
      fallbackIcon: 'fas fa-home'
    },
    { 
      path: '/statistics', 
      label: 'Statistics', 
      icon: '📊',
      fallbackIcon: 'fas fa-chart-line'
    },
    { 
      path: '/settings', 
      label: 'Settings', 
      icon: '⚙️',
      fallbackIcon: 'fas fa-cog'
    },
    { 
      path: '/community', 
      label: 'Join Community', 
      icon: '👥',
      fallbackIcon: 'fas fa-users'
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const email = localStorage.getItem('email');
        if (!email) {
          throw new Error('No email found');
        }

        const response = await axios.get('http://localhost:5000/userdata', {
          params: {
            UserEmail: email
          }
        });

        setUserData(response.data.setupData);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // Close sidebar on mobile after navigation
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate('/setup');
    if (onClose) onClose();
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Loading state
  if (loading) {
    return (
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          <div className="loading-skeleton">
            <div className="skeleton-profile"></div>
            <div className="skeleton-measurements"></div>
            <div className="skeleton-nav"></div>
          </div>
        </div>
        {onClose && <div className="sidebar-overlay" onClick={onClose}></div>}
      </div>
    );
  }

  // Error state - show minimal sidebar
  if (error || !userData) {
    return (
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          <div className="error-state">
            <p>Unable to load profile</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
          <nav className="navigation">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
              >
                <span className="nav-icon" role="img" aria-label={item.label}>
                  {item.icon}
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        {onClose && <div className="sidebar-overlay" onClick={onClose}></div>}
      </div>
    );
  }

  return (
    <>
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          {/* Close button for mobile */}
          {onClose && (
            <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
              ✕
            </button>
          )}

          {/* User Profile Section */}
          <div className="user-profile">
            <div className="user-info">
              <div className="profile-img-container">
                <img 
                  src={profileImage} 
                  alt={`${userData.Name}'s profile picture`}
                  className="profile-img" 
                />
                <div className="online-indicator"></div>
              </div>
              <div className="user-details">
                <h3 className="user-name">{userData.Name}</h3>
                <p className="user-meta">{userData.Gender}, {userData.Age} years</p>
              </div>
            </div>
            <button 
              onClick={handleEditClick}
              className="edit-btn"
              aria-label="Edit profile"
            >
              EDIT
            </button>
          </div>
          
          {/* Measurements Section */}
          <div className="measurements">
            <div className="measurement">
              <p className="measurement-label">HEIGHT</p>
              <p className="measurement-value">
                {userData.Height}
                <span className="measurement-unit">cm</span>
              </p>
            </div>
            <div className="measurement-divider"></div>
            <div className="measurement">
              <p className="measurement-label">WEIGHT</p>
              <p className="measurement-value">
                {userData.Weight}
                <span className="measurement-unit">kg</span>
              </p>
            </div>
          </div>
          
          {/* Navigation Section */}
          <nav className="navigation">
            <h4 className="nav-title">Navigation</h4>
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                aria-label={`Navigate to ${item.label}`}
              >
                <span className="nav-icon" role="img" aria-label="">
                  {item.icon}
                </span>
                <span className="nav-label">{item.label}</span>
                {isActivePath(item.path) && <span className="active-indicator"></span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && onClose && <div className="sidebar-overlay" onClick={onClose}></div>}

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 320px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-right: 1px solid #e2e8f0;
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow-y: auto;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        }

        .sidebar-open {
          transform: translateX(0);
        }

        .sidebar-content {
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .sidebar-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #64748b;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .sidebar-close:hover {
          background-color: #f1f5f9;
          color: #334155;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          backdrop-filter: blur(2px);
        }

        .user-profile {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .user-info {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .profile-img-container {
          position: relative;
        }

        .profile-img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e2e8f0;
          transition: border-color 0.2s ease;
        }

        .profile-img:hover {
          border-color: #10b981;
        }

        .online-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          background-color: #10b981;
          border: 2px solid white;
          border-radius: 50%;
        }

        .user-details {
          margin-left: 1rem;
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          font-size: 1.125rem;
          color: #1e293b;
          margin: 0 0 0.25rem 0;
          line-height: 1.4;
        }

        .user-meta {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0;
          line-height: 1.4;
        }

        .edit-btn {
          background: none;
          border: 1px solid #10b981;
          color: #10b981;
          font-weight: 600;
          font-size: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.5px;
        }

        .edit-btn:hover {
          background-color: #10b981;
          color: white;
          transform: translateY(-1px);
        }

        .measurements {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          padding: 1.5rem;
          border-radius: 1rem;
          position: relative;
        }

        .measurement {
          text-align: center;
          flex: 1;
        }

        .measurement-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #cbd5e1, transparent);
          margin: 0 1rem;
        }

        .measurement-label {
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .measurement-value {
          font-weight: 700;
          font-size: 1.5rem;
          color: #1e293b;
          margin: 0;
          line-height: 1;
        }

        .measurement-unit {
          font-size: 0.875rem;
          color: #64748b;
          margin-left: 0.25rem;
          font-weight: 400;
        }

        .navigation {
          flex: 1;
        }

        .nav-title {
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          width: 100%;
          color: #475569;
          background: none;
          border: none;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          transition: all 0.2s ease;
          cursor: pointer;
          margin-bottom: 0.5rem;
          position: relative;
          text-align: left;
          font-size: 0.875rem;
        }

        .nav-link:hover {
          background-color: #f1f5f9;
          color: #10b981;
          transform: translateX(4px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .nav-link.active:hover {
          transform: translateX(0);
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .nav-icon {
          font-size: 1.125rem;
          margin-right: 0.75rem;
          width: 1.5rem;
          text-align: center;
          flex-shrink: 0;
        }

        .nav-label {
          flex: 1;
          font-weight: 500;
        }

        .active-indicator {
          width: 4px;
          height: 4px;
          background-color: currentColor;
          border-radius: 50%;
          margin-left: 0.5rem;
          opacity: 0.8;
        }

        .loading-skeleton {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .skeleton-profile {
          height: 80px;
          background-color: #e2e8f0;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .skeleton-measurements {
          height: 100px;
          background-color: #e2e8f0;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .skeleton-nav {
          height: 200px;
          background-color: #e2e8f0;
          border-radius: 0.5rem;
        }

        .error-state {
          text-align: center;
          padding: 2rem 1rem;
          color: #64748b;
          margin-bottom: 2rem;
        }

        .retry-btn {
          background-color: #10b981;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s ease;
          margin-top: 0.5rem;
        }

        .retry-btn:hover {
          background-color: #059669;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Desktop styles */
        @media (min-width: 1024px) {
          .sidebar {
            position: relative;
            transform: translateX(0);
            width: 300px;
            height: auto;
            min-height: 100vh;
          }

          .sidebar-close {
            display: none;
          }

          .sidebar-overlay {
            display: none;
          }
        }

        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 1023px) {
          .sidebar {
            width: 280px;
          }
        }

        /* Mobile styles */
        @media (max-width: 767px) {
          .sidebar {
            width: 100vw;
            max-width: 300px;
          }

          .user-profile {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
          }

          .user-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .user-details {
            margin-left: 0;
            margin-top: 0.5rem;
          }

          .measurements {
            flex-direction: column;
            gap: 1rem;
          }

          .measurement-divider {
            width: 40px;
            height: 1px;
            margin: 0;
          }

          .nav-link {
            padding: 1rem;
            font-size: 1rem;
          }

          .nav-icon {
            font-size: 1.25rem;
            margin-right: 1rem;
          }
        }

        /* Small mobile styles */
        @media (max-width: 480px) {
          .sidebar-content {
            padding: 1rem;
          }

          .profile-img {
            width: 56px;
            height: 56px;
          }

          .user-name {
            font-size: 1rem;
          }

          .measurements {
            padding: 1rem;
          }

          .measurement-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;