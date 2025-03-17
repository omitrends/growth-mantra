import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validate from "./SetupValidation.cjs";

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
  });

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch registered user email
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

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Debugging log

    if (!email) {
      toast.error("Email not found. Please register again.");
      return;
    }

    // Validate form data
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare final data
    const finalSetupData = { ...formData, email };
    console.log("Form data being sent to the server:", finalSetupData); // Debugging log

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      if (!token) {
        toast.error("Token not found. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sending token in the Authorization header
        },
        body: JSON.stringify(finalSetupData),
      });

      console.log("Fetching data to backend:", finalSetupData); // Debugging log

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      toast.success("Setup completed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error(error.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.modalContent}>
      <div className="text-center mb-5">
        <button className="btn btn-success btn-lg w-100 rounded-pill">
          SETUP YOUR ACCOUNT
        </button>
      </div>
      <p>Email: {email}</p>

      <form onSubmit={handleFormSubmit} className="needs-validation" noValidate>
        <div className="row g-3">
          {/* Full Name */}
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
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
              className={`form-control ${errors.phoneno ? "is-invalid" : ""}`}
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
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
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
              className={`form-control ${errors.height ? "is-invalid" : ""}`}
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
              className={`form-control ${errors.weight ? "is-invalid" : ""}`}
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
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Fitness Goal */}
          <div className="col-md-6">
            <label className="form-label">Fitness Goal</label>
            <select name="fitnessgoal" className="form-control" value={formData.fitnessgoal} onChange={handleChange} required>
              <option value="">Select Fitness Goal</option>
              <option value="Fat loss">Fat Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
            </select>
          </div>

          {/* Lifestyle */}
          <div className="col-md-6">
            <label className="form-label">Lifestyle</label>
            <select name="lifestyle" className="form-control" value={formData.lifestyle} onChange={handleChange} required>
              <option value="">Select Lifestyle</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg rounded-pill mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "SAVE"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  modalContent: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default Setup;