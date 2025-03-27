function Validation(values) {
    let error = {};
  
    // Email validation pattern
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,}$/;
  
    // Username Validation
    if (values.username === "") {
      error.username = "Username is required";
    }
  
    // Email Validation
    if (values.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Please enter a valid email";
    }
  
    // Password Validation with individual checks
    if (values.password === "") {
      error.password = "Password cannot be empty";
    } else {
      // Check if password has at least 8 characters
      if (values.password.length < 8) {
        error.password = "Password must be at least 8 characters long";
      }
      // Check if password contains at least one uppercase letter
      else if (!/[A-Z]/.test(values.password)) {
        error.password = "Password must contain at least one uppercase letter";
      }
      // Check if password contains at least one lowercase letter
      else if (!/[a-z]/.test(values.password)) {
        error.password = "Password must contain at least one lowercase letter";
      }
      // Check if password contains at least one number
      else if (!/\d/.test(values.password)) {
        error.password = "Password must contain at least one number";
      }
      // Optional: Check if password contains at least one special character
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        error.password = "Password must contain at least one special character";
      }
    }
  
    // Confirm Password Validation
    if (values.confirmPassword === "") {
      error.confirmPassword = "Confirm Password cannot be empty";
    } else if (values.password !== values.confirmPassword) {
      error.confirmPassword = "Passwords do not match";
    }
  
    // If no error for a field, don't add it to the error object
    if (!error.username) {
      error.username = "";
    }
    if (!error.email) {
      error.email = "";
    }
    if (!error.password) {
      error.password = "";
    }
    if (!error.confirmPassword) {
      error.confirmPassword = "";
    }
  
    return error;
  }
  
  export default Validation;
  