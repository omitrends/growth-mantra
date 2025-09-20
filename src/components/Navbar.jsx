import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import React, { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const getStartedButtonStyle = {
    display: 'inline-block',
    padding: '8px 20px',
    backgroundColor: '#7ca982',
    color: '#000',
    textDecoration: 'none',
    borderRadius: '4px',
    border: 'none',
    transition: 'all 0.3s ease',
    fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
    whiteSpace: 'nowrap'
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/community', label: 'Community' },
    { path: '/contact-us', label: 'Contact us' },
    { 
      path: '/growth-mantra-ai', 
      label: 'Growth Mantra AI',
      icon: 'fa-regular fa-message ai-icon ml-1'
    }
  ];

  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <Link className="navbar-brand" to="/" onClick={handleNavigation('/')}>
            <img 
              src={logo} 
              alt="Growth Mantra Logo" 
              style={{maxHeight: '40px', width: 'auto'}} 
            />
            <span style={{fontSize: 'clamp(1rem, 4vw, 1.25rem)'}}>
              Growth Mantra
            </span>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            style={{
              border: '1px solid rgba(0,0,0,.1)',
              borderRadius: '4px',
              padding: '4px 8px'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div 
            className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
            id="navbarSupportedContent"
          >
            <div className="d-flex ml-auto flex-column flex-lg-row align-items-center w-100 justify-content-lg-end">
              <ul className="navbar-nav mb-2 mb-lg-0">
                {navItems.map((item) => (
                  <li 
                    key={item.path} 
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <Link 
                      className="nav-link px-2 px-lg-3" 
                      to={item.path}
                      onClick={handleNavigation(item.path)}
                      style={{
                        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                        color: isActive(item.path) ? '#7ca982' : 'inherit'
                      }}
                    >
                      {item.label}
                      {item.icon && (
                        <i className={item.icon} style={{fontSize: '0.9em'}}></i>
                      )}
                      {isActive(item.path) && (
                        <span className="sr-only">(current)</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="quote_btn-container ml-0 ml-lg-4 d-flex justify-content-center mt-2 mt-lg-0">
                <Link 
                  to="/get-started" 
                  onClick={handleNavigation('/get-started')}
                  style={{
                    ...getStartedButtonStyle,
                    padding: 'clamp(6px, 1.5vw, 8px) clamp(15px, 4vw, 20px)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#6b9770';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#7ca982';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .navbar-toggler:focus {
          box-shadow: 0 0 0 0.2rem rgba(124, 169, 130, 0.25);
        }
        
        .nav-link {
          transition: color 0.3s ease;
        }
        
        .nav-link:hover {
          color: #7ca982 !important;
        }
        
        .navbar-brand:hover {
          opacity: 0.8;
        }

        @media (max-width: 991.98px) {
          .navbar-nav {
            text-align: center;
            width: 100%;
          }
          
          .nav-item {
            margin: 0.25rem 0;
          }
          
          .quote_btn-container {
            width: 100%;
            margin-top: 1rem !important;
          }
          
          .navbar-brand span {
            margin-left: 0.5rem;
          }
          
          .custom_nav-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (max-width: 575.98px) {
          .navbar-brand {
            font-size: 1.1rem;
          }
          
          .navbar-brand img {
            max-height: 35px !important;
          }
          
          .container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }

        @media (max-width: 375px) {
          .navbar-brand span {
            display: none;
          }
          
          .navbar-brand img {
            max-height: 30px !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;