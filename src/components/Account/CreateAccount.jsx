import { useState } from "react";
import logo from "../../assets/images/rb_26614.png";
import Setup from "../Setup";
import CloseButton from "../CloseButton"; // Import the CloseButton component

const CreateAccount = () => {
  const [showSetup, setShowSetup] = useState(false);

  const setupPage = (event) => {
    event.preventDefault();
    console.log("Register button clicked");
    setShowSetup(true);
  };

  const closeModal = () => {
    console.log("Close button clicked");
    setShowSetup(false);
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
          <form style={styles.form}>
            <div style={styles.inputContainer}>
              <i className="fa fa-user" style={styles.icon}></i>
              <input type="text" placeholder="Enter Username" style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-envelope" style={styles.icon}></i>
              <input type="email" placeholder="Enter Email" style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-calendar" style={styles.icon}></i>
              <input type="date" placeholder="Enter Date of Birth" style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-key" style={styles.icon}></i>
              <input type="password" placeholder="Enter Password" style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-lock" style={styles.icon}></i>
              <input type="password" placeholder="Confirm Password" style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-lock" style={styles.icon}></i>
              <input type="number" placeholder="Enter the number" style={styles.input} />
            </div>
            <button onClick={setupPage} type="submit" style={styles.button}>
              REGISTER
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
    // backgroundColor: "#f9f9f9",
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
    backdropFilter: "blur(5px)", // Apply blur effect
  },
  modalContent: {
//     backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "relative", // Add relative positioning
  },
};

export default CreateAccount;
