function Validation(values) {
    let error = {};

    // Email validation (only check if email is not empty)
    if (values.email === "") {
        error.email = "Email should not be empty";
    } else {
        error.email = ""; // Clear error if valid
    }

    // Password validation (only check if password is not empty)
    if (values.password === "") {
        error.password = "Password cannot be empty";
    } else {
        error.password = ""; // Clear error if valid
    }

    return error;
}

export default Validation;
