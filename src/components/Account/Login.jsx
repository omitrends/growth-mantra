import "./Login.css";
import login from "../../assets/images/login.jpg";
import googleLogo from "../../assets/images/google-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ForgetPass from "../ForgetPass";
import CloseButton from "../CloseButton"; // Import the CloseButton component

const Login = () => {
  const navigate = useNavigate();
  const [showForget, setShowForget] = useState(false);

  const ClickedforgetPass = (event) => {
    event.preventDefault();
    setShowForget(true);
  };

  const closeModal = () => {
    setShowForget(false);
  };

  const handlregisterclick = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div>
      <div className="login-container">
        {/* Left Section with Logo */}
        <div className="left-section">
          <div className="logo-container">
            <img src={login} alt="Growth Mantra" className="login-img" />
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="right-section">
          <h2 className="login-title">LOGIN</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Username"
              className="input-field"
              style={styles.input}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Enter Password"
              className="input-field"
              style={styles.input}
            />
          </div>

          <button className="login-button">LOGIN</button>

          <div className="extra-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/forgot-password" onClick={ClickedforgetPass}>Forgot Password</a>
          </div>

          <hr className="divider" />
          <p className="or-text">or login with</p>

          <button className="google-login">
            <img src={googleLogo} alt="Google" className="google-icon" />
            GOOGLE
          </button>

          <p className="register-text">
            Don’t have an account?{" "}
            <a href="/register" onClick={handlregisterclick}>
              Register
            </a>
          </p>
        </div>
      </div>
      {showForget && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <CloseButton onClick={closeModal} />
            <ForgetPass />
          </div>
        </div>
      )}
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
    backdropFilter: "blur(5px)", // Apply blur effect
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "relative", // Add relative positioning
  },
};

export default Login;
