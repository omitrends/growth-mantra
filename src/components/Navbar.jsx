import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Import the image
import { Padding } from '@mui/icons-material';
import React from "react";

function Navbar() {
  const navigate = useNavigate();

  const clickonGetStarted = (event) => {
    event.preventDefault();
    navigate('/get-started');
  };

  const handleCommunity = (event) => {
    event.preventDefault();
    navigate('/Community');
  };

  const handleContactUs = (event)=>{
    event.preventDefault();
    navigate('/contact-us')
  }

  const handleGMAI = (event)=>{
    event.preventDefault();
    navigate('/growth-mantra-ai')
  }

  // Simple rounded button style with black text
  const getStartedButtonStyle = {
    display: 'inline-block',
    padding: '8px 20px',
    backgroundColor: '#7ca982',
    color: 'black', // Black text color as requested
    // fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '0px', // Slightly rounded edges
    border: 'none'
  };

  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Growth Mantra Logo" />
            <span>Growth Mantra</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/community" onClick={handleCommunity}>
                    Community
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to = "/contact-us" onClick={handleContactUs} className="nav-link">
                    Contact us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to = "/growth-mantra-ai" onClick={handleGMAI} className="nav-link">
                    Growth Mantra AI
                    <i className="fa-regular fa-message ai-icon"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="quote_btn-container ml-0 ml-lg-4 d-flex justify-content-center">
              <Link 
                to="/get-started" 
                onClick={clickonGetStarted}
                style={getStartedButtonStyle}
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;