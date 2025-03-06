import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'; // Import the image
import './css/style.css';
import './css/bootstrap.css';
import './css/responsive.css';

function Navbar() {
  const navigate = useNavigate();

  const clickonGetStarted = (event) => {
    event.preventDefault();
    navigate('/get-started');
  };

  const set = (event) => {
    event.preventDefault();
    navigate('/setup');
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
                  <Link className="nav-link" to="/community">
                    Community
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/setup" onClick={set}>
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="quote_btn-container ml-0 ml-lg-4 d-flex justify-content-center">
              <Link to="/get-started" onClick={clickonGetStarted}>
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