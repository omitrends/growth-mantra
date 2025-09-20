import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login.jpg";
import googleLogo from "../assets/images/google-logo.png";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!values.email || !values.password) {
      setErrors({
        email: !values.email ? "Email is required" : "",
        password: !values.password ? "Password is required" : "",
      });
      return;
    }

    setLoading(true);
    setServerError("");

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
          setSuccessMessage("Login successful!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", values.email);

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

  // Inline styles
  const styles = {
    loginContainer: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      flexDirection: windowWidth <= 768 ? 'column' : 'row'
    },
    leftSection: {
      flex: 1,
      display: windowWidth <= 768 ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      padding: '2rem'
    },
    loginImg: {
      maxWidth: '450px',
      width: '450px',
      height: 'auto',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    rightSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: windowWidth <= 768 ? (windowWidth <= 480 ? '1.5rem 1rem' : '2rem 1rem') : '3rem 2rem',
      backgroundColor: '#ffffff',
      width: windowWidth <= 768 ? '100%' : 'auto',
      minHeight: windowWidth <= 768 ? '100vh' : 'auto'
    },
    loginTitle: {
      fontSize: windowWidth <= 480 ? '1.8rem' : (windowWidth <= 768 ? '2rem' : '2.5rem'),
      fontWeight: 'bold',
      color: '#333',
      marginBottom: windowWidth <= 480 ? '1rem' : (windowWidth <= 768 ? '1.5rem' : '2rem'),
      textAlign: 'center'
    },
    inputGroup: {
      width: '100%',
      maxWidth: windowWidth <= 480 ? '100%' : '400px',
      marginBottom: '1rem'
    },
    inputField: {
      width: '100%',
      padding: windowWidth <= 480 ? '0.6rem 0.8rem' : '0.75rem 1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: windowWidth <= 480 ? '16px' : '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box'
    },
    errorText: {
      color: '#dc3545',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
      marginBottom: '0.5rem',
      textAlign: 'left',
      width: '100%',
      maxWidth: windowWidth <= 480 ? '100%' : '400px'
    },
    successMessage: {
      color: '#28a745',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
      textAlign: 'center',
      width: '100%',
      maxWidth: windowWidth <= 480 ? '100%' : '400px'
    },
    loginButton: {
      width: '100%',
      maxWidth: windowWidth <= 480 ? '100%' : '400px',
      padding: windowWidth <= 480 ? '0.8rem 1rem' : '0.75rem 1rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'background-color 0.3s ease'
    },
    extraOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: windowWidth <= 480 ? '100%' : '400px',
      marginTop: '1rem',
      fontSize: '0.875rem',
      flexDirection: windowWidth <= 480 ? 'column' : 'row',
      gap: windowWidth <= 480 ? '0.5rem' : '0',
      textAlign: windowWidth <= 480 ? 'center' : 'left'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666'
    },
    forgotLink: {
      color: '#007bff',
      textDecoration: 'none'
    },
    divider: {
      width: '100%',
      maxWidth: windowWidth <= 480 ? '100%' : '400px',
      border: 'none',
      borderTop: '1px solid #e0e0e0',
      margin: windowWidth <= 480 ? '1rem 0' : '1.5rem 0'
    },
    orText: {
      color: '#666',
      fontSize: '0.875rem',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    googleLogin: {
      width: '100%',
      maxWidth: windowWidth <= 480 ? '100%' : '400px',
      padding: windowWidth <= 480 ? '0.8rem 1rem' : '0.75rem 1rem',
      backgroundColor: 'white',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
    },
    googleIcon: {
      width: '20px',
      height: '20px'
    },
    registerText: {
      marginTop: windowWidth <= 480 ? '1rem' : '1.5rem',
      fontSize: '0.875rem',
      color: '#666',
      textAlign: 'center'
    },
    registerLink: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.loginContainer}>
      {windowWidth > 768 && (
        <div style={styles.leftSection}>
          <img 
            src={loginImage} 
            alt="Growth Mantra" 
            style={styles.loginImg} 
          />
        </div>
      )}
      
      <div style={styles.rightSection}>
        <h2 style={styles.loginTitle}>LOGIN</h2>

        <div style={styles.inputGroup}>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter Email"
            style={styles.inputField}
          />
        </div>
        {errors.email && (
          <p style={styles.errorText}>{errors.email}</p>
        )}

        <div style={styles.inputGroup}>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter Password"
            style={styles.inputField}
          />
        </div>
        {errors.password && (
          <p style={styles.errorText}>{errors.password}</p>
        )}

        <button 
          onClick={handleLogin} 
          style={styles.loginButton} 
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        {successMessage && (
          <p style={styles.successMessage}>{successMessage}</p>
        )}
        {serverError && (
          <p style={styles.errorText}>{serverError}</p>
        )}

        <div style={styles.extraOptions}>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="/forgot-password" style={styles.forgotLink}>
            Forgot Password
          </a>
        </div>

        <hr style={styles.divider} />
        <p style={styles.orText}>or login with</p>

        <button style={styles.googleLogin}>
          <img src={googleLogo} alt="Google" style={styles.googleIcon} />
          GOOGLE
        </button>

        <p style={styles.registerText}>
          Don't have an account?{" "}
          <a href="/register" onClick={handleRegisterClick} style={styles.registerLink}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;