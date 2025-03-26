import React from 'react';
import './DashBoard.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const navigate = useNavigate();

    const handleFitnessClick = () => {
        navigate('/fitness');
    };
    const handleNutritionClick = () => {
      navigate('/nutrition');
    };
    const handleMentalWellbeingClick = () => {
    navigate('/mentalwellbeing');
    };

    return (
      <div className="dashboard-container">
        <Sidebar />
        <div style={{ display: "flex", flexDirection: "column" }} className="main-content">
          <div className="category-cards">
            <div 
              className="category-card fitness" 
              onClick={handleFitnessClick}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-dumbbell card-icon"></i>
              <span className="card-label">FITNESS</span>
            </div>
            <div className="category-card mental"
            onClick={handleMentalWellbeingClick}
            style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-brain card-icon"></i>
              <span className="card-label">MENTAL WELL-BEING</span>
            </div>
            <div className="category-card nutrition"
            onClick={handleNutritionClick}
            style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-utensils card-icon"></i>
              <span className="card-label">NUTRITION</span>
            </div>
          </div>
          
          <div className="progress-section">
            <p className="section-title">TRACK YOUR PROGRESS</p>
            <div className="progress-container">
              {/* Content for tracking progress goes here */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashBoard;