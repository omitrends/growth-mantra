import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed

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
      // BMI formula: weight (kg) / (height (m))^2
      const weightInKg = parseFloat(formData.weight);
      const heightInM = parseFloat(formData.height) / 100; // Convert cm to m
      if (!isNaN(weightInKg) && !isNaN(heightInM) && heightInM > 0) {
        const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1);
        setFormData(prev => ({ ...prev, bmi }));
      }
    }
  }, [formData.weight, formData.height]);

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
    <div className=" container d-flex align-items-center justify-content-center py-5 ">
      <div className=" container d-flex align-items-center justify-content-center">
        <div className="bg-white w-50 p-4 p-md-5  rounded-lg shadow ">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-success mb-3">Setup Your Account</h2>
            <p className="text-muted">Complete your profile to get personalized fitness recommendations</p>
          </div>
          
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="row g-4">
              {/* Personal Information Section */}
              <div className="col-12">
                <h5 className="border-bottom pb-2 mb-3">Personal Information</h5>
              </div>
              
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  id="fullName" 
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                  id="phoneNumber" 
                  placeholder="10-digit phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="age" className="form-label">Age</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                  id="age" 
                  placeholder="Your Age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                />
                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select 
                  className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                  id="gender" 
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>
              
              {/* Physical Information Section */}
              <div className="col-12 mt-4">
                <h5 className="border-bottom pb-2 mb-3">Physical Information</h5>
              </div>
              
              <div className="col-md-6">
                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                  id="weight" 
                  placeholder="Enter your weight in kg"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.1"
                  min="20"
                  max="300"
                />
                {errors.weight && <div className="invalid-feedback">{errors.weight}</div>}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="height" className="form-label">Height (cm)</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.height ? 'is-invalid' : ''}`}
                  id="height" 
                  placeholder="Enter your height in cm"
                  value={formData.height}
                  onChange={handleChange}
                  min="50"
                  max="250"
                />
                {errors.height && <div className="invalid-feedback">{errors.height}</div>}
              </div>
              
              <div className="col-md-12">
                <label htmlFor="bmi" className="form-label">BMI (Body Mass Index)</label>
                <input 
                  type="text" 
                  className="form-control bg-light"
                  id="bmi" 
                  value={formData.bmi}
                  readOnly
                  placeholder="BMI will be calculated automatically"
                />
                {formData.bmi && (
                  <div className="form-text">
                    {parseFloat(formData.bmi) < 18.5 ? 'Underweight' : 
                     parseFloat(formData.bmi) < 25 ? 'Normal weight' :
                     parseFloat(formData.bmi) < 30 ? 'Overweight' : 'Obese'}
                  </div>
                )}
              </div>
              
              {/* Fitness Goals Section */}
              <div className="col-12 mt-4">
                <h5 className="border-bottom pb-2 mb-3">Fitness Profile</h5>
              </div>
              
              <div className="col-md-6">
                <label htmlFor="fitnessGoal" className="form-label">Fitness Goal</label>
                <select 
                  className={`form-control ${errors.fitnessGoal ? 'is-invalid' : ''}`}
                  id="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                >
                  <option value="">Select Fitness Goal</option>
                  <option value="loseWeight">Lose Weight</option>
                  <option value="gainMuscle">Gain Muscle</option>
                  <option value="stayFit">Stay Fit</option>
                  <option value="improveEndurance">Improve Endurance</option>
                </select>
                {errors.fitnessGoal && <div className="invalid-feedback">{errors.fitnessGoal}</div>}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="lifeStyle" className="form-label">Lifestyle</label>
                <select 
                  className={`form-control ${errors.lifeStyle ? 'is-invalid' : ''}`}
                  id="lifeStyle"
                  value={formData.lifeStyle}
                  onChange={handleChange}
                >
                  <option value="">Select Lifestyle</option>
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="lightlyActive">Lightly Active (1-3 days/week)</option>
                  <option value="moderatelyActive">Moderately Active (3-5 days/week)</option>
                  <option value="veryActive">Very Active (6-7 days/week)</option>
                  <option value="extremelyActive">Extremely Active (twice per day)</option>
                </select>
                {errors.lifeStyle && <div className="invalid-feedback">{errors.lifeStyle}</div>}
              </div>
            </div>
            
            <div className="text-center mt-5">
              <button 
                type="submit" 
                className="btn btn-success btn-lg px-5" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : 'SAVE & CONTINUE'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setup;