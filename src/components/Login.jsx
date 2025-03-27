import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../assets/images/login.jpg"; // Adjust if needed
import googleLogo from "../assets/images/google-logo.png"; // Adjust if needed

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState(""); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Basic validation (can be extended with more checks)
    if (!values.email || !values.password) {
      setErrors({
        email: !values.email ? "Email is required" : "",
        password: !values.password ? "Password is required" : "",
      });
      return;
    }

    setLoading(true);
    setServerError(""); // Reset previous error message

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })    
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage("Login successful! Redirecting...");
          // Store token in localStorage or sessionStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", values.email);

          // Redirect after 2 seconds to show success message
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setServerError(data.message || "Login failed, please try again.");
        }
      })
      .catch((error) => {
        setServerError("Error occurred, please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <img src={loginImage} alt="Growth Mantra" className="login-img" />
      </div>
      <div className="right-section">
        <h2 className="login-title">LOGIN</h2>

        <div className="input-group">
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="input-field"
          />
        </div>
        {errors.email && <p className="error-text">{errors.email}</p>}

        <div className="input-group">
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="input-field"
          />
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button onClick={handleLogin} className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {serverError && <p className="error-text">{serverError}</p>}

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
          Don’t have an account?{" "}
          <a href="/register" onClick={handleRegisterClick}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
