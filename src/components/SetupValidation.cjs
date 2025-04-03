const validate = (values) => {
  const errors = {};

  // Adjusted to match formData field names
  if (!values.name) {
    errors.name = 'Name is required'; // Change from fullName to name
  } else if (/[^a-zA-Z\s]/.test(values.name)) {
    errors.name = 'Name cannot contain numbers or special characters';
  }

  if (!values.phoneno) {
    errors.phoneno = 'Phone number is required'; // Change from phoneNumber to phoneno
  } else if (!/^\d{10}$/.test(values.phoneno)) {
    errors.phoneno = 'Phone number must be exactly 10 digits';
  }

  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age < 10 || values.age > 120) {
    errors.age = 'Age must be above 10 years';
  }

  if (!values.weight) {
    errors.weight = 'Weight is required in Kgs';
  } else if (isNaN(values.weight) || values.weight <= 0) {
    errors.weight = 'Weight must be a positive number in kilograms';
  }

  if (!values.height) {
    errors.height = 'Height is required';
  } else if (isNaN(values.height) || values.height <= 0) {
    errors.height = 'Height must be a positive number in centimeters';
  }

  if (!values.bmi) {
    errors.bmi = 'BMI is required';
  }

  if (!values.lifeStyle || values.lifeStyle === "Select") {
    errors.lifeStyle = 'Lifestyle is required'; // Matches formData lifeStyle
  }

  if (!values.fitnessGoal || values.fitnessGoal === "Select") {
    errors.fitnessGoal = 'Fitness goal is required'; // Matches formData fitnessGoal
  }

  if (!values.gender || values.gender === 'Select') {
    errors.gender = 'Gender is required';
  }

  return errors;
};

export default validate;
