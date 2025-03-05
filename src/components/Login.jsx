import React, { useState } from "react";
import "./Login.css";
import login from "../assets/images/login.jpg";
import googleLogo from "../assets/images/google-logo.png";
import { useNavigate } from "react-router-dom";
import Validation from './LoginValidation.cjs';

const Login = () => {
  // State for email and password
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleRegisterClick = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const[errors,setErrors]=useState({})

  const handleInput = (event) => {
    setValues(prev=>({...prev, [event.target.name]:[event.target.value]}))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const ValidationErrors=Validation(values);
    setErrors(ValidationErrors);
  };

  return (
    <div className="login-container">
      {/* Left Section with Logo */}
      <div className="left-section">
        <div className="logo-container">
          <img src={login} alt="Growth Mantra" className="login-img" />
          {/* <h1 className="title">GROWTH MANTRA</h1> */}
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="right-section">
        <h2 className="login-title">LOGIN</h2>

        <form action="" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleInput}
              placeholder="Enter Username"
              className="input-field"
              style={styles.input}
            />
            {errors.email && <span className="text-red">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleInput}
              placeholder="Enter Password"
              className="input-field"
              style={styles.input}
            />
            {errors.password && <span className="text-red">{errors.password}</span>}

          </div>

          <button type="submit" className="login-button">LOGIN</button>
        </form>

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
          Don’t have an account? <a href="/register" onClick={handleRegisterClick}>Register</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
};

export default Login;