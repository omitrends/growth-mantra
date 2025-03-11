import './Setup.css';
import React, { useState } from 'react';
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
  const [loading, setLoading] = useState(false); // Track loading state
  const [message, setMessage] = useState(''); // To store success/error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Update errors when the value changes, only validate the field changed
    setErrors(validate({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the entire form
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Only submit the form if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        setMessage(''); // Reset message before sending request

        // Sending data to backend to register user
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
            bmi: values.bmi,
            lifestyle: values.lifestyle,
            fitnessgoal: values.fitnessgoal,
            gender: values.gender,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Setup successful!');
          setTimeout(() => {
            window.location.href = '/dashboard'; // Redirect to Dashboard
          }, 1500);
        } else {
          setMessage(data.message || 'Something went wrong, please try again.');
        }
      } catch (error) {
        setMessage('Error occurred during Setup, please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const navigate = useNavigate();
  const setupPage = (event) => {
    event.preventDefault();
    navigate('/set-up');
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
              {errors.name && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.name}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="weight" className="text-gray-700">Weight</label>
              <input
                type="text"
                id="weight"
                placeholder="Weight"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.weight}
                onChange={handleInputChange}
              />
              {errors.weight && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.weight}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone no"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.phoneNo}
                onChange={handleInputChange}
              />
              {errors.phoneNo && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.phoneNo}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="height" className="block text-gray-700">Height</label>
              <input
                type="text"
                id="height"
                placeholder="Height"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.height}
                onChange={handleInputChange}
              />
              {errors.height && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.height}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700">Gender</label>
              <div className="relative">
                <select
                  id="gender"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                  value={values.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {errors.gender}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="bmi" className="block text-gray-700">BMI</label>
              <input
                type="text"
                id="bmi"
                placeholder="BMI"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.bmi}
                onChange={handleInputChange}
              />
              {errors.bmi && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.bmi}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="age" className="block text-gray-700">Age</label>
              <input
                type="text"
                id="age"
                placeholder="Your Age"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
                value={values.age}
                onChange={handleInputChange}
              />
              {errors.age && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.age}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="fitnessGoal" className="block text-gray-700">Fitness Goal</label>
              <div className="relative">
                <select
                  id="fitnessGoal"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                  value={values.fitnessgoal}
                  onChange={handleInputChange}
                >
                  <option value="Weight loss">Weight Loss</option>
                  
                  <option value="Muscle Gain">Muscle Gain</option>
                 
                </select>
                {errors.fitnessgoal && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {errors.fitnessgoal}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="lifeStyle" className="block text-gray-700">Life Style</label>
            <div className="relative">
              <select
                id="lifeStyle"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                value={values.lifestyle}
                onChange={handleInputChange}
              >
                <option value="Sedentary">Sedentary</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
              </select>
              {errors.lifestyle && (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  {errors.lifestyle}
                </span>
              )}
            </div>
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
