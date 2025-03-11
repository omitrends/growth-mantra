const validate = (values) => {
  const errors = {};

  // Validation for name
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (/[^a-zA-Z\s]/.test(values.name)) {
    // Ensuring name contains only letters and spaces
    errors.name = 'Name cannot contain numbers or special characters';
  }

  // Validation for phone number (ensure it's exactly 10 digits)
  if (!values.phoneNo) {
    errors.phoneNo = 'Phone number is required';
  } else if (!/^\d{10}$/.test(values.phoneNo)) {
    // Check that phone number is exactly 10 digits
    errors.phoneNo = 'Phone number must be exactly 10 digits';
  }

  // Validation for age (ensure it's a number between 10 and 120)
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age < 10 || values.age > 120) {
    errors.age = 'Age must be a valid number between 10 and 120';
  }

  // Validation for weight
  if (!values.weight) {
    errors.weight = 'Weight is required in Kgs';
  } else if (isNaN(values.weight) || values.weight <= 0) {
    errors.weight = 'Weight must be a positive number in kilograms';
  }

  // Validation for height
  if (!values.height) {
    errors.height = 'Height is required';
  } else if (isNaN(values.height) || values.height <= 0) {
    errors.height = 'Height must be a positive number in centimeters';
  }

  // BMI validation
  if (!values.bmi) {
    errors.bmi = 'BMI is required';
  }

  // Lifestyle validation
  if (!values.lifestyle || values.lifestyle === "Select") {
    errors.lifestyle = 'Lifestyle is required';
  }

  // Fitness goal validation
  if (!values.fitnessgoal || values.fitnessgoal === "Select") {
    errors.fitnessgoal = 'Fitness goal is required';
  }

  // Gender validation
  if (!values.gender || values.gender === 'Select') {
    errors.gender = 'Gender is required';
  }

  return errors;
};

export default validate;
