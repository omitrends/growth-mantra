import React from 'react';
import './Setup.css';
import { useState, useEffect } from 'react';
import validate from './SetupValidation.cjs';

function Setup() {
  const [formData, setFormData] = useState({
    fullName: '',
    weight: '',
    phoneNumber: '',
    height: '',
    gender: '',
    bmi: '',
    age: '',
    fitnessGoal: '',
    lifestyle: '',
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Calculate BMI based on weight (kg) and height (cm)
  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height from cm to meters
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // BMI formula
      return bmi;
    }
    return '';
  };

  // Automatically calculate BMI whenever height or weight changes
  useEffect(() => {
    const bmi = calculateBMI(formData.weight, formData.height);
    setFormData((prevState) => ({
      ...prevState,
      bmi: bmi,
    }));
  }, [formData.weight, formData.height]); // This effect runs when either height or weight changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting
  
    // Validate the form data using the validation function
    const validationErrors = validate(formData);
    
    // Set errors in the state
    setErrors(validationErrors);
  
    // If there are no errors, proceed with form submission
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", formData);
      // Add form submission logic here (e.g., save data, redirect, etc.)
    }
  };
  return (
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
              <label htmlFor="fullName" className="block text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Your Full Name"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="weight" className="block text-gray-700">
                Weight(in kg)
              </label>
              <input
                type="text"
                id="weight"
                placeholder="Weight"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={formData.weight}
                onChange={handleChange}
              />
              {errors.weight && <p className="text-red-500">{errors.weight}</p>}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone no"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label htmlFor="height" className="block text-gray-700">
                Height(in cm)
              </label>
              <input
                type="text"
                id="height"
                placeholder="Height"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={formData.height}
                onChange={handleChange}
              />
              {errors.height && <p className="text-red-500">{errors.height}</p>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="bmi" className="block text-gray-700">
                BMI
              </label>
              <input
                type="text"
                id="bmi"
                placeholder="BMI"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={formData.bmi}
                disabled // Disable the BMI field as it's auto-calculated
              />
              {errors.bmi && <p className="text-red-500">{errors.bmi}</p>}
            </div>
            <div>
              <label htmlFor="age" className="block text-gray-700">
                Age
              </label>
              <input
                type="text"
                id="age"
                placeholder="Your Age"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="text-red-500">{errors.age}</p>}
            </div>
            <div>
              <label htmlFor="fitnessGoal" className="block text-gray-700">
                Fitness Goal
              </label>
              <div className="relative">
                <select
                  id="fitnessGoal"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                >
                  <option value="Weight loss">Weight Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="General Fitness">General Fitness</option>
                  {errors.fitnessGoal && <p className="text-red-500">{errors.fitnessGoal}</p>}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="lifeStyle" className="block text-gray-700">
              Life Style
            </label>
            <div className="relative">
            <select
                  id="lifestyle"
                  name="lifestyle"
                  value={formData.lifestyle}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                >
                <option value="Sedentary">Sedentary</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
              </select>
              {errors.lifestyle && <p className="text-red-500">{errors.lifestyle}</p>}
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Setup;