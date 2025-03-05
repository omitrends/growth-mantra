import React from "react";
import "./Login.css";
import logo from "../assets/images/logo.png"; 
import googleLogo from "../assets/images/google-logo.png";
// import user from "../assets/images/user.png";
// import passkey from "../assets/images/passkey.png";

const Login = () => {
  return (
    <div className="login-container">
      {/* Left Section with Logo */}
      <div className="left-section">
        <div className="logo-container">
          <img src={logo} alt="Growth Mantra" className="logo" />
          <h1 className="title">GROWTH MANTRA</h1>
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="right-section">
        <h2 className="login-title">LOGIN</h2>

        <div className="input-group">
          {/* <img src={user} alt="User" classname="input-icon" /> */}
          <input type="text" placeholder="Enter Username" className="input-field" />
        </div>

        <div className="input-group">
          {/* <img src={passkey} alt="Pass" classname="input-icon" /> */}
          <input type="password" placeholder="Enter Password" className="input-field" />
        </div>

        <button className="login-button">LOGIN</button>

        <div className="extra-options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="/forgot-password">Forgot Password</a>
        </div>

        <hr className="divider" />
        <p className="or-text">or login with</p>
        

        <button className="google-login">
          <img src={googleLogo} alt="Google" className="google-icon" />
          GOOGLE
        </button>

        <p className="register-text">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
