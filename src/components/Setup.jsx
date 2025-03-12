// import React from 'react';

function Setup() {
  return (
    <div style={styles.modalContent}>
      <div className="text-center mb-5">
        <button className="btn btn-success btn-lg w-100 rounded-pill">
          SETUP YOUR ACCOUNT
        </button>
      </div>
      <form className="needs-validation" noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Your Full Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="weight" className="form-label">
              Weight
            </label>
            <input
              type="text"
              id="weight"
              placeholder="Weight"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone no"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="height" className="form-label">
              Height
            </label>
            <input
              type="text"
              id="height"
              placeholder="Height"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select id="gender" className="form-select" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="bmi" className="form-label">
              BMI
            </label>
            <input
              type="text"
              id="bmi"
              placeholder="BMI"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="text"
              id="age"
              placeholder="Your Age"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="fitnessGoal" className="form-label">
              Fitness Goal
            </label>
            <select id="fitnessGoal" className="form-select" required>
              <option value="Weight loss">Weight Loss</option>
              <option value="Weight Gain">Weight Gain</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="General Fitness">General Fitness</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="lifeStyle" className="form-label">
              Life Style
            </label>
            <select id="lifeStyle" className="form-select" required>
              <option value="Sedentary">Sedentary</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
            </select>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success btn-lg rounded-pill">
              SAVE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

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