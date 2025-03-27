import { useState } from "react";
import React from "react";
import logo from "../../assets/images/rb_26614.png";
import Setup from "../Setup";
import CloseButton from "../CloseButton"; 
// import react from 'react'

const CreateAccount = () => {
  const [showSetup, setShowSetup] = useState(false); // State for showing the setup page
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // For displaying any error messages
  const [loading, setLoading] = useState(false); // To show loading state

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setupPage = async (event) => {
    event.preventDefault(); // Prevent default form submission
  
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
  
    setLoading(true); // Start loading
  
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
  
        // ✅ Store token and email for future use
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("email", formData.email); // Store email
  
        // ✅ Show the setup page
        setShowSetup(true);
      } else {
        setError(data.message || "Registration failed, please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.error(error);
    } finally {
      setLoading(false); // End loading state
    }
  };
  
  
  

  const closeModal = () => {
    console.log("Close button clicked");
    setShowSetup(false); // Close the setup page modal
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.leftPane}>
          <img src={logo} alt="Growth Mantra Logo" style={styles.logo} />
        </div>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "80vh",
    backgroundColor: "#f9f9f9",
  },
  leftPane: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  logo: {
    width: "500px",
    backgroundColor: "transparent",
  },
  rightPane: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderLeft: "1px solid #ddd",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  loginText: {
    fontSize: "14px",
    marginBottom: "20px",
  },
  loginLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
    color: "#888",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
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
  },
  modalContent: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "relative",
    minWidth: "300px",
    backgroundColor: "#fff",
  },
};

export default CreateAccount;
