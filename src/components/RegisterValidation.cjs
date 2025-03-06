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
  
    // Date of Birth Validation
    if (values.dob === "") {
      error.dob = "Date of birth is required";
    } else {
      const dob = new Date(values.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (age < 10) {
        error.dob = "You must be at least 10 years old";
      }
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
      // If all conditions are met, reset the password error
      else {
        error.password = "";
      }
    }

    // Confirm Password Validation
    if (values.confirmPassword === "") {
      error.confirmPassword = "Confirm Password cannot be empty";
    } else if (values.password !== values.confirmPassword) {
      error.confirmPassword = "Passwords do not match";
    }
  
    // Clear the error object key if valid
    if (!error.username) {
      delete error.username;
    }
    if (!error.email) {
      delete error.email;
    }
    if (!error.dob) {
      delete error.dob;
    }
    if (!error.password) {
      delete error.password;
    }
    if (!error.confirmPassword) {
      delete error.confirmPassword;
    }
  
    return error;
}
  
export default Validation;
