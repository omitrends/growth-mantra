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

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-full"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'SAVE'}
            </button>
            {message && <p className="text-green-500 mt-4">{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Setup;