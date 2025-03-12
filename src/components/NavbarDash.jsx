import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png'; // Replace with your logo path
import './NavbarDash.css'; // Import the CSS file

function NavbarDash() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0); // State to track the streak

  // Logout function
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('userToken'); // Clear user session/token
    navigate('/login'); // Redirect to login page
  };

  // Function to update the streak
  const updateStreak = () => {
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    if (lastLoginDate === currentDate) return; // Already logged in today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];

    if (lastLoginDate === yesterdayDate) {
      setStreak((prevStreak) => prevStreak + 1); // Increment streak
    } else {
      setStreak(1); // Reset streak if missed a day
    }

    localStorage.setItem('lastLoginDate', currentDate); // Update last login date
  };

  // Initialize streak on component mount
  useEffect(() => {
    const savedStreak = localStorage.getItem('streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
    updateStreak(); // Update streak on every page load
  }, []);

  // Save streak to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  return (
    <header className="dashboard-navbar">
      <div className="navbar-container">
        {/* Logo and Brand Name */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Growth Mantra Logo" className="logo" />
          <span className="brand-name">Growth Mantra</span>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/goals" className="nav-link">Goals</Link>
          <Link to="/progress" className="nav-link">Progress</Link>
        </nav>

        {/* Streak and Logout Section */}
        <div className="navbar-actions">
          <div className="streak-container">
            <span className="streak-text">🔥 Streak: {streak} days</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavbarDash;