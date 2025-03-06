// import React from "react";
import logo from "../assets/images/rb_26614.png";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

  const navigate = useNavigate();
  const setupPage=(event)=>{
    event.preventDefault();
    navigate('/set-up');
  };
  return (
    <div>

         {/* <Navbar/> */}
    <div style={styles.container}>
      <div style={styles.leftPane}>
        <img
          src={logo}
          alt="Growth Mantra Logo"
          style={styles.logo}
        />
        {/* <h1 style={styles.title}>GROWTH MANTRA</h1> */}
      </div>
      <div style={styles.rightPane}>
        <h2 style={styles.heading}>CREATE ACCOUNT</h2>
        <p style={styles.loginText}>
          Already have an account? <a href="/login" style={styles.loginLink}>Login</a>
        </p>
        <form style={styles.form}>
          <div style={styles.inputContainer}>
            <i className="fa fa-user" style={styles.icon}></i>
            <input
              type="text"
              placeholder="Enter Username"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <i className="fa fa-envelope" style={styles.icon}></i>
            <input
              type="email"
              placeholder="Enter Email"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <i className="fa fa-calendar" style={styles.icon}></i>
            <input
              type="date"
              placeholder="Enter Date of Birth"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <i className="fa fa-key" style={styles.icon}></i>
            <input
              type="password"
              placeholder="Enter Password"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <i className="fa fa-lock" style={styles.icon}></i>
            <input
              type="password"
              placeholder="Confirm Password"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
                <i className="fa fa-lock" style={styles.icon}></i>
                <input type="number"
                        placeholder="Enter the number"
                        style={styles.input}
                />
          </div>
          <button onClick={setupPage} type="submit" style={styles.button}>
            REGISTER
          </button>
        </form>
      </div>
    </div>
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
    // backgroundColor: "#e9f7ef",
    backgroundColor: "#f9f9f9",

  },
  logo: {
    width: "500px",
    // marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
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
};

export default CreateAccount;
