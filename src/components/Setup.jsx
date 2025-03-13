import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed

// Helper functions for BMI category and color
const getBMICategory = (bmi) => {
  const bmiValue = parseFloat(bmi);
  if (bmiValue < 18.5) return 'Underweight';
  if (bmiValue < 25) return 'Normal weight';
  if (bmiValue < 30) return 'Overweight';
  return 'Obese';
};

const getBMIColor = (bmi) => {
  const bmiValue = parseFloat(bmi);
  if (bmiValue < 18.5) return '#FFC107'; // Yellow for Underweight
  if (bmiValue < 25) return '#28A745'; // Green for Normal
  if (bmiValue < 30) return '#FF6B6B'; // Orange for Overweight
  return '#DC3545'; // Red for Obese
};

const Setup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    weight: '',
    phoneNumber: '',
    height: '',
    gender: '',
    bmi: '',
    age: '',
    fitnessGoal: '',
    lifeStyle: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate BMI automatically when weight and height change
  useEffect(() => {
    if (formData.weight && formData.height) {
      const weightInKg = parseFloat(formData.weight);
      const heightInM = parseFloat(formData.height) / 100; // Convert cm to m
      if (!isNaN(weightInKg) && !isNaN(heightInM) && heightInM > 0) {
        const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1);
        setFormData(prev => ({ ...prev, bmi }));
      }
    }
  }, [formData.weight, formData.height]);

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    else if (isNaN(formData.weight)) newErrors.weight = 'Weight must be a number';
    
    if (!formData.height) newErrors.height = 'Height is required';
    else if (isNaN(formData.height)) newErrors.height = 'Height must be a number';
    
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age)) newErrors.age = 'Age must be a number';
    
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) 
      newErrors.phoneNumber = 'Please enter a valid 10-digit number';
    
    if (!formData.gender || formData.gender === 'Gender') 
      newErrors.gender = 'Please select your gender';
    
    if (!formData.fitnessGoal || formData.fitnessGoal === 'Fitness Goal') 
      newErrors.fitnessGoal = 'Please select a fitness goal';
    
    if (!formData.lifeStyle) 
      newErrors.lifeStyle = 'Please select your lifestyle';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error when field is being edited
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        toast.success('Profile information saved successfully!');
        
        // Navigate to the dashboard after successful submission
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to save profile information. Please try again.');
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  return (
    <div style={styles.modalContent}>
      <div className="text-center mb-5">
        <button className="btn btn-success btn-lg w-100 rounded-pill">
          SETUP YOUR ACCOUNT
        </button>
      </div>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="row g-3">
          {/* Personal Information Section */}
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Your Full Name"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="weight" className="form-label">
              Weight
            </label>
            <input
              type="text"
              id="weight"
              placeholder="Weight"
              className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
              value={formData.weight}
              onChange={handleChange}
              required
            />
            {errors.weight && <div className="invalid-feedback">{errors.weight}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone no"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="height" className="form-label">
              Height
            </label>
            <input
              type="text"
              id="height"
              placeholder="Height"
              className={`form-control ${errors.height ? 'is-invalid' : ''}`}
              value={formData.height}
              onChange={handleChange}
              required
            />
            {errors.height && <div className="invalid-feedback">{errors.height}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="bmi" className="form-label">
              BMI
            </label>
            <input
              type="text"
              id="bmi"
              placeholder="BMI"
              className="form-control bg-light"
              value={formData.bmi}
              readOnly
            />
            {formData.bmi && (
              <div className="form-text" style={{ color: getBMIColor(formData.bmi) }}>
                {getBMICategory(formData.bmi)}
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="text"
              id="age"
              placeholder="Your Age"
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="fitnessGoal" className="form-label">
              Fitness Goal
            </label>
            <select
              id="fitnessGoal"
              className={`form-control ${errors.fitnessGoal ? 'is-invalid' : ''}`}
              value={formData.fitnessGoal}
              onChange={handleChange}
              required
            >
              <option value="">Select Fitness Goal</option>
              <option value="Weight loss">Weight Loss</option>
              <option value="Weight Gain">Weight Gain</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="General Fitness">General Fitness</option>
            </select>
            {errors.fitnessGoal && <div className="invalid-feedback">{errors.fitnessGoal}</div>}
          </div>
          <div className="col-12">
            <label htmlFor="lifeStyle" className="form-label">
              Life Style
            </label>
            <select
              id="lifeStyle"
              className={`form-control ${errors.lifeStyle ? 'is-invalid' : ''}`}
              value={formData.lifeStyle}
              onChange={handleChange}
              required
            >
              <option value="">Select Lifestyle</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>
            {errors.lifeStyle && <div className="invalid-feedback">{errors.lifeStyle}</div>}
          </div>
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg rounded-pill"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : 'SAVE'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Styles
const styles = {
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "auto",
  },
};

export default Setup;