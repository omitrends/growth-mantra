// SetupValidation.cjs
const validate = (values) => {
  const errors = {};

  // Example validation for name
  if (!values.name) {
    errors.name = 'Name is required';
  }else if (/[^a-zA-Z\s]/.test(values.name)) {
    // Regular expression checks if name contains only digits
    errors.name = 'Name cannot be a number or special character';
  }

  // Example validation for phone number (ensure it's a valid number or format)
  if (!values.phoneNo) {
    errors.phoneNo = 'Phone number is required';
  } else if (!/^\d{10}$/.test(values.phoneNo)) {
    errors.phoneNo = 'Phone number must be 10 digits';
  }

  // Example validation for age (should be a number and a valid age range)
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age < 10 || values.age > 120) {
    errors.age = 'Age must be a valid number between 18 and 120';
  }

  // Other validations for weight, height, etc. can be added similarly.
  if (!values.weight) {
    errors.weight = 'Weight is required in Kgs';
  } else if (isNaN(values.weight) || values.weight <= 0) {
    errors.weight = 'Weight must be a positive number in kilograms';
  }

  if (!values.height) {
    errors.height = 'Height is required';
  }else if (isNaN(values.height) || values.height <= 0) {
    errors.height = 'Height must be a positive number in Centimeters';
  }

   if (!values.bmi) {
     errors.bmi = 'BMI is required';
   }

  if (!values.lifestyle) {
    errors.lifestyle = 'Lifestyle is required';
  }

  if (!values.fitnessgoal) {
    errors.fitnessgoal = 'Fitness goal is required';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required';
  }

  return errors;
};

export default validate;
