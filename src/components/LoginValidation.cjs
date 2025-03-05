function Validation(values) {
    let error = {};
  
    // Email validation pattern
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Email validation
    if (values.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Email did not match";
    }else{
        error.email=""
    }
  
    // Password validation pattern
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{7,}$/;
  
    // Password validation
    if (values.password === "") {
      error.password = "Password cannot be empty";
    } else if (!password_pattern.test(values.password)) {
      error.password = "Password didn't match";
    } else{
        error.password=""
    }
  
    return error;
  }
  
  export default Validation;
  