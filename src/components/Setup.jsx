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

import './Setup.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validate from './SetupValidation.cjs';

function Setup() {
  const [values, setValues] = useState({
    name: '',
    phoneNo: '',
    age: '',
    height: '',
    weight: '',
    bmi: '',
    lifestyle: '',  
    fitnessgoal: '',
    gender: '',  
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    if (weight && height) {
      return (weight / ((height / 100) ** 2)).toFixed(2);
    }
    return '';
  };

  // Recalculate BMI when weight or height changes
  useEffect(() => {
    const bmi = calculateBMI(values.weight, values.height);
    setValues((prevState) => ({
      ...prevState,
      bmi: bmi,
    }));
  }, [values.weight, values.height]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        setMessage('');

        // Retrieve email from localStorage
        const email = localStorage.getItem('userEmail'); // Ensure the email is stored on login

        if (!email) {
          setMessage('Email not found. Please log in again.');
          setLoading(false);
          return;
        }

        // Send email along with other form data
        const response = await fetch('http://localhost:5000/setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            phoneNo: values.phoneNo,
            age: values.age,
            height: values.height,
            weight: values.weight,
            lifestyle: values.lifestyle,
            fitnessgoal: values.fitnessgoal,
            gender: values.gender,
            email: email, // Send the email in the body
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Setup data saved successfully!');
          setTimeout(() => {
            window.location.href = '/dashboard'; // Redirect to dashboard after setup
          }, 1500);
        } else {
          setMessage(data.message || 'Error saving setup data.');
          console.log('Error data from backend:', data); // Log error data
        }
      } catch (error) {
        console.error('Error during setup submission:', error); // Log full error
        setMessage('Error occurred during Setup, please try again.');
      } finally {
        setLoading(false);
      }
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
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full w-full">
            SETUP YOUR ACCOUNT
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Your Full Name"
                name="name"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="weight" className="block text-gray-700">Weight (kg)</label>
              <input
                type="text"
                id="weight"
                placeholder="Weight"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.weight}
                onChange={handleInputChange}
                name="weight"
              />
              {errors.weight && <p className="text-red-500">{errors.weight}</p>}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Phone no"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.phoneNo}
                onChange={handleInputChange}
                name="phoneNo"
              />
              {errors.phoneNo && <p className="text-red-500">{errors.phoneNo}</p>}
            </div>
            <div>
              <label htmlFor="height" className="block text-gray-700">Height (cm)</label>
              <input
                type="text"
                id="height"
                placeholder="Height"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.height}
                onChange={handleInputChange}
                name="height"
              />
              {errors.height && <p className="text-red-500">{errors.height}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700">Gender</label>
              <select
                id="gender"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.gender}
                onChange={handleInputChange}
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="text-red-500">{errors.gender}</p>}
            </div>
            <div>
              <label htmlFor="bmi" className="block text-gray-700">BMI</label>
              <input
                type="text"
                id="bmi"
                placeholder="BMI"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.bmi}
                disabled
              />
              {errors.bmi && <p className="text-red-500">{errors.bmi}</p>}
            </div>
            <div>
              <label htmlFor="age" className="block text-gray-700">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                placeholder="Your Age"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.age}
                onChange={handleInputChange}
              />
              {errors.age && <p className="text-red-500">{errors.age}</p>}
            </div>
            <div>
              <label htmlFor="fitnessGoal" className="block text-gray-700">Fitness Goal</label>
              <select
                id="fitnessGoal"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.fitnessgoal}
                onChange={handleInputChange}
                name='fitnessgoal'
              >
                <option value="">Select Fitness Goal</option> {/* Removed "Select" option with disabled */}
                <option value="Fat loss">Fat Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
              </select>
              {errors.fitnessgoal && <p className="text-red-500">{errors.fitnessgoal}</p>}
            </div>
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
          <div>
            <label htmlFor="lifeStyle" className="block text-gray-700">Life Style</label>
            <select
              id="lifeStyle"
              className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
              value={values.lifestyle}
              onChange={handleInputChange}
              name='lifestyle'
            >
              <option value="">Select Life Style</option> {/* Removed "Select" option with disabled */}
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>
            {errors.lifestyle && <p className="text-red-500">{errors.lifestyle}</p>}
          </div>
          <div className="col-12 text-center">

          <div className="text-center">
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
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'SAVE'}
            </button>
          </div>
        </div>
      </form>
            {message && <p className="text-green-500 mt-4">{message}</p>}
          </div>
        </form>
      </div>
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