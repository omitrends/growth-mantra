import React, { useState } from "react";
import logo from "../assets/images/rb_26614.png";
import Validation from './RegisterValidation.cjs';

const CreateAccount = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Update errors when the value changes, only validate the field changed
    setErrors(Validation({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Only submit the form if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", values);
    }
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.leftPane}>
          <img
            src={logo}
            alt="Growth Mantra Logo"
            style={styles.logo}
          />
        </div>
        <div style={styles.rightPane}>
          <h2 style={styles.heading}>CREATE ACCOUNT</h2>
          <p style={styles.loginText}>
            Already have an account? <a href="/login" style={styles.loginLink}>Login</a>
          </p>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputContainer}>
              <i className="fa fa-user" style={styles.icon}></i>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.username && <span style={styles.error}>{errors.username}</span>}
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-envelope" style={styles.icon}></i>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-calendar" style={styles.icon}></i>
              <input
                type="date"
                placeholder="Enter Date of Birth"
                name="dob"
                value={values.dob}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.dob && <span style={styles.error}>{errors.dob}</span>}
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-key" style={styles.icon}></i>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.password && <span style={styles.error}>{errors.password}</span>}
            </div>
            <div style={styles.inputContainer}>
              <i className="fa fa-lock" style={styles.icon}></i>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
              />
              {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
            </div>
            <button type="submit" style={styles.button}>
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
    backgroundColor: "#f9f9f9",
  },
  logo: {
    width: "500px",
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
    flexDirection: "column",  // Stacks the input and error message vertically
    alignItems: "flex-start", // Align the input and error message to the left
    marginBottom: "15px",     // Adds space between the inputs
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
  error: {
    color: "#ff4545",
    fontSize: "14px",
    display: "block",
    width: "100%",
    marginBottom: "10px",
    margin: "2px",
    padding: "2px"
  }
};

export default CreateAccount;
