
import "./css/style.css";
import "./css/bootstrap.css";
import "./css/responsive.css";
import "./js/bootstrap.js";
import "./js/jquery-3.4.1.min.js";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate =useNavigate();
  const clickonGetStarted=(event)=>{
    event.preventDefault();
    navigate('/get-started');
  };
  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <a className="navbar-brand" href="index.html">
            <img src="./src/assets/images/logo.png" alt="Growth Mantra Logo" />
            <span>Growth Mantra</span>
          </a>
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
                  <a className="nav-link" href="index.html">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="fruit.html">
                    Community
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            <div className="quote_btn-container ml-0 ml-lg-4 d-flex justify-content-center">
              <a href="/get-started" onClick={clickonGetStarted}>Get Started</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;