import { useState, useEffect } from "react";
import logo from "../assets/images/rb_26614.png";
import Setup from "./Setup";
import CloseButton from "./CloseButton"; 
import React from "react";

const CreateAccount = () => {
  const [showSetup, setShowSetup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setupPage = async (event) => {
    event.preventDefault();
  
    // Validate inputs
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    setLoading(true);
  
    try {
      // Send the registration request to the backend
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        console.log("Registration successful");
  
        // Store token and email for future use
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("email", formData.email);
  
        // Show the setup page
        setShowSetup(true);
      } else {
        setError(data.message || "Registration failed, please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    console.log("Close button clicked");
    setShowSetup(false);
  };

  // Responsive styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: windowWidth <= 768 ? "column" : "row",
      minHeight: "100vh",
      backgroundColor: "#f9f9f9",
      fontFamily: 'Arial, sans-serif'
    },
    leftPane: {
      flex: 1,
      display: windowWidth <= 768 ? "none" : "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      padding: "2rem"
    },
    logo: {
      width: windowWidth <= 1024 ? "350px" : "500px",
      maxWidth: "90%",
      height: "auto",
      backgroundColor: "transparent",
    },
    rightPane: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      padding: windowWidth <= 768 ? (windowWidth <= 480 ? "1.5rem 1rem" : "2rem 1rem") : "3rem 2rem",
      borderLeft: windowWidth <= 768 ? "none" : "1px solid #ddd",
      width: windowWidth <= 768 ? "100%" : "auto",
      minHeight: windowWidth <= 768 ? "100vh" : "auto"
    },
    heading: {
      fontSize: windowWidth <= 480 ? "1.8rem" : (windowWidth <= 768 ? "2rem" : "2.5rem"),
      marginBottom: windowWidth <= 480 ? "0.5rem" : "1rem",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center"
    },
    loginText: {
      fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
      marginBottom: windowWidth <= 480 ? "1rem" : "1.5rem",
      color: "#666",
      textAlign: "center"
    },
    loginLink: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "bold"
    },
    form: {
      width: "100%",
      maxWidth: windowWidth <= 480 ? "100%" : "400px"
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
      position: "relative"
    },
    icon: {
      position: "absolute",
      left: "1rem",
      fontSize: "1.1rem",
      color: "#888",
      zIndex: 1
    },
    input: {
      width: "100%",
      padding: windowWidth <= 480 ? "0.75rem 1rem 0.75rem 2.5rem" : "0.75rem 1rem 0.75rem 2.5rem",
      border: "2px solid #e0e0e0",
      borderRadius: "8px",
      fontSize: windowWidth <= 480 ? "16px" : "1rem",
      outline: "none",
      transition: "border-color 0.3s ease",
      boxSizing: "border-box"
    },
    errorText: {
      color: "#dc3545",
      fontSize: "0.875rem",
      marginBottom: "1rem",
      textAlign: "center",
      backgroundColor: "#f8d7da",
      padding: "0.5rem",
      borderRadius: "4px",
      border: "1px solid #f5c6cb"
    },
    button: {
      width: "100%",
      padding: windowWidth <= 480 ? "0.8rem 1rem" : "0.75rem 1rem",
      backgroundColor: "#28a745",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "1rem",
      transition: "background-color 0.3s ease"
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(5px)",
      zIndex: 1000,
      padding: windowWidth <= 480 ? "1rem" : "2rem"
    },
    modalContent: {
      padding: windowWidth <= 480 ? "1rem" : "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      position: "relative",
      minWidth: windowWidth <= 480 ? "90%" : "400px",
      maxWidth: windowWidth <= 480 ? "95%" : "90%",
      maxHeight: "90vh",
      backgroundColor: "#fff",
      overflow: "auto"
    }
  };

  return (
    <div>
      <div style={styles.container}>
        {windowWidth > 768 && (
          <div style={styles.leftPane}>
            <img src={logo} alt="Growth Mantra Logo" style={styles.logo} />
          </div>
        )}
        
        <div style={styles.rightPane}>
          <h2 style={styles.heading}>CREATE ACCOUNT</h2>
          <p style={styles.loginText}>
            Already have an account? <a href="/login" style={styles.loginLink}>Login</a>
          </p>
          
          <form style={styles.form} onSubmit={setupPage}>
            <div style={styles.inputContainer}>
              <i className="fa fa-user" style={styles.icon}></i>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.inputContainer}>
              <i className="fa fa-envelope" style={styles.icon}></i>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.inputContainer}>
              <i className="fa fa-key" style={styles.icon}></i>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            
            <div style={styles.inputContainer}>
              <i className="fa fa-lock" style={styles.icon}></i>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            
            {error && <p style={styles.errorText}>{error}</p>}
            
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </form>
        </div>
      </div>

      {showSetup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <CloseButton onClick={closeModal} />
            <Setup />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;