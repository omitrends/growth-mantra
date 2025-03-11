import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import login from '../assets/images/login.jpg';
import googleLogo from '../assets/images/google-logo.png';

const Login = () => {
  // State for email and password
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleRegisterClick = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send login data to backend for authentication
    try {
      setLoading(true); // Set loading to true when starting the API request
      setMessage(''); // Clear any previous message before submitting

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        
        // Store the JWT token in localStorage
        localStorage.setItem('authToken', data.token);
        
        // Redirect to dashboard after a successful login
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500); // Optional delay before redirect
      } else {
        setMessage(data.message || 'Invalid credentials'); // Show backend error message
      }
    } catch (error) {
      setMessage('Error occurred during login, please try again.');
    } finally {
      setLoading(false); // Reset loading state after API call
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo-container">
          <img src={login} alt="Growth Mantra" className="login-img" />
        </div>
      </div>

      <div className="right-section">
        <h2 className="login-title">LOGIN</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleInput}
              placeholder="Enter Email"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleInput}
              placeholder="Enter Password"
              className="input-field"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
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

export default Login;