import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React from "react";

const Setup = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phoneno: "",
    age: "",
    height: "",
    weight: "",
    lifestyle: "",
    fitnessgoal: "",
    gender: "",
    bmi: "",
  });

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch registered user email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail); // Set email from localStorage
    }
  }, []);

  // Calculate BMI dynamically
  useEffect(() => {
    const weightInKg = parseFloat(formData.weight);
    const heightInCm = parseFloat(formData.height);
    const heightInM = heightInCm / 100;

    if (weightInKg > 0 && heightInM > 0) {
      const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1);
      setFormData((prev) => ({ ...prev, bmi }));
    } else {
      setFormData((prev) => ({ ...prev, bmi: "" }));
    }
  }, [formData.weight, formData.height]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    const { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender } = formData;

    // Name validation
    if (!name) newErrors.name = "Name is required";

    // Phone Number validation (only digits, 10 characters)
    if (!phoneno || !/^\d{10}$/.test(phoneno)) newErrors.phoneno = "Enter a valid 10-digit phone number";

    // Age validation (positive number)
    if (!age || age <= 10) newErrors.age = "Age must be above 10 years";

    // Height validation (positive number)
    if (!height || height <= 0) newErrors.height = "Height must be a positive number";

    // Weight validation (positive number)
    if (!weight || weight <= 0) newErrors.weight = "Weight must be a positive number";

    // Lifestyle validation
    if (!lifestyle) newErrors.lifestyle = "Lifestyle is required";

    // Fitness Goal validation
    if (!fitnessgoal) newErrors.fitnessgoal = "Fitness Goal is required";

    // Gender validation
    if (!gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);

    // Return false if there are any validation errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate form data before submitting
    if (!validate()) return;

    const formDataToSend = {
      name: formData.name,
      phoneno: formData.phoneno,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      lifestyle: formData.lifestyle,
      fitnessgoal: formData.fitnessgoal,
      gender: formData.gender,
      UserEmail: email,
    };

    console.log('Form Data Being Sent:', formDataToSend); // Add this to check the data

    try {
      const response = await axios.post('http://localhost:5000/setup', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setSuccessMessage("Setup completed successfully!");

        // Redirect after a delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000); // 3 seconds delay
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="modal-content p-4 rounded shadow-sm position-relative">
      <div className="text-center mb-4">
        <button className="btn btn-success btn-lg w-100 rounded-pill">
          SETUP YOUR ACCOUNT
        </button>
      </div>
      <p>Email: {email}</p>

      {/* Display Success Message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleFormSubmit} className="needs-validation" noValidate>
        <div className="row g-3">
          {/* Full Name */}
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phoneno"
              placeholder="Phone no"
              className={`form-control ${errors.phoneno ? 'is-invalid' : ''}`}
              value={formData.phoneno}
              onChange={handleChange}
              required
            />
            {errors.phoneno && <div className="invalid-feedback">{errors.phoneno}</div>}
          </div>

          {/* Age */}
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Your Age"
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
          </div>

          {/* Height */}
          <div className="col-md-6">
            <label className="form-label">Height (cm)</label>
            <input
              type="text"
              name="height"
              placeholder="Height"
              className={`form-control ${errors.height ? 'is-invalid' : ''}`}
              value={formData.height}
              onChange={handleChange}
              required
            />
            {errors.height && <div className="invalid-feedback">{errors.height}</div>}
          </div>

          {/* Weight */}
          <div className="col-md-6">
            <label className="form-label">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              placeholder="Weight"
              className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
              value={formData.weight}
              onChange={handleChange}
              required
            />
            {errors.weight && <div className="invalid-feedback">{errors.weight}</div>}
          </div>

          {/* BMI */}
          <div className="col-md-6">
            <label className="form-label">BMI</label>
            <input
              type="text"
              name="bmi"
              className="form-control bg-light"
              value={formData.bmi}
              readOnly
            />
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select
              name="gender"
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

          {/* Fitness Goal */}
          <div className="col-md-6">
            <label className="form-label">Fitness Goal</label>
            <select
              name="fitnessgoal"
              className={`form-control ${errors.fitnessgoal ? 'is-invalid' : ''}`}
              value={formData.fitnessgoal}
              onChange={handleChange}
              required
            >
              <option value="">Select Fitness Goal</option>
              <option value="Fat loss">Fat Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
            </select>
            {errors.fitnessgoal && <div className="invalid-feedback">{errors.fitnessgoal}</div>}
          </div>

          {/* Lifestyle */}
          <div className="col-md-6">
            <label className="form-label">Lifestyle</label>
            <select
              name="lifestyle"
              className={`form-control ${errors.lifestyle ? 'is-invalid' : ''}`}
              value={formData.lifestyle}
              onChange={handleChange}
              required
            >
              <option value="">Select Lifestyle</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>
            {errors.lifestyle && <div className="invalid-feedback">{errors.lifestyle}</div>}
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg rounded-pill mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "SAVE"}
        </button>
      </form>
    </div>
  );
};

export default Setup;
