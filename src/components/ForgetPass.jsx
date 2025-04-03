import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/images/logo.png";

function ForgetPass() {
  const [email, setEmail] = useState(""); // State for email input
  const [message, setMessage] = useState(""); // State for success message
  const [error, setError] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setMessage(""); // Reset success message
    setError(""); // Reset error message

    try {
      // Send POST request to the backend API
      const response = await axios.post("http://localhost:5000/forget-password", { email });
      if (response.data.success) {
        setMessage("Password reset email sent. Please check your inbox.");
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{ minHeight: "100vh", paddingTop: "100px" }}
    >
      <div className="text-center">
        {/* Logo */}
        <div className="mb-4">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "80px" }}
          />
        </div>

        {/* Forget Password Form */}
        <div className="bg-light p-4 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="mt-3">Forgot Password</h2>
          <p className="mb-3">Please enter your email to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email} // Bind email state
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
          {message && <p className="text-success mt-3">{message}</p>} {/* Success message */}
          {error && <p className="text-danger mt-3">{error}</p>} {/* Error message */}
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;