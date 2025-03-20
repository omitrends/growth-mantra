// import React from 'react';
import './Fitness.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router';

const Fitness = () => {

const navigate = useNavigate();
    function handleViewPlan(){
        navigate('/recommended-plans')
    }
    function handlelog(){
        navigate('/workout-logs')
    }
  return (
    <div className="fitness-container">
      <Sidebar />
      
      <div className="fitness-content">
        <div className='title-box'>
        <h1 className="fitness-title">FITNESS TRACKER</h1>
        </div>
        
        <div className="fitness-boxes">
          {/* First Box - Log Your Workout */}
          <div className="fitness-box workout-log">
            <div className="box-content">
              <h2>Log Your Workout</h2>
              <p>Keep track of your daily exercises and routines</p>
              <button onClick ={handlelog} className="fitness-button">Start Logging</button>
            </div>
            <div className="box-image workout-image">
              {/* Image will be added via CSS */}
            </div>
          </div>
          
          {/* Second Box - Recommended Plans */}
          <div className="fitness-box recommended-plans">
            <div className="box-content">
              <h2>Recommended Plans</h2>
              <p>Discover workout plans tailored for your goals</p>
              <button onClick={handleViewPlan} className="fitness-button">View Plans</button>
            </div>
            <div className="box-image plans-image">
              {/* Image will be added via CSS */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;