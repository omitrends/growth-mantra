import React from 'react';
import './Setup.css';

function Setup() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full w-full">
            SETUP YOUR ACCOUNT
          </button>
        </div>
        <form className="space-y-6">
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
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-gray-700">
                Weight
              </label>
              <input
                type="text"
                id="weight"
                placeholder="Weight"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
              />
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
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-gray-700">
                Height
              </label>
              <input
                type="text"
                id="height"
                placeholder="Height"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
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
              />
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
              />
            </div>
            <div>
              <label htmlFor="fitnessGoal" className="block text-gray-700">
                Fitness Goal
              </label>
              <div className="relative">
                <select
                  id="fitnessGoal"
                  className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
                >
                  <option value="Weight loss">Weight Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="General Fitness">General Fitness</option>
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
                id="lifeStyle"
                className="w-full mt-2 p-3 border rounded-lg bg-gray-100 appearance-none"
              >
                <option value="Sedentary">Sedentary</option>
                <option value="Moderate">Moderate</option>
                <option value="Active">Active</option>
              </select>
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