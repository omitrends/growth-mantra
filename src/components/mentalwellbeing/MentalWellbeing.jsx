// import React from 'react';
import './MentalWellbeing.css';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router';

const MentalWellbeing = () => {

  const navigate = useNavigate();
  
  function handleJournaling() {
    navigate('/journaling');
  }

  function handleMeditation() {
    navigate('/meditation');
  }

  return (
    <div className="mentalwellbeing-container">
      <Sidebar />

      <div className="mentalwellbeing-content">
        <div className='title-box'>
          <h1 className="mentalwellbeing-title">MENTAL WELL-BEING</h1>
        </div>

        <div className="mentalwellbeing-boxes">

          {/* First Box - Journaling */}
          <div className="mentalwellbeing-box journaling">
            <div className="box-content">
              <h2>Journaling</h2>
              <p>Express your thoughts and reflect on your day.</p>
              <button onClick={handleJournaling} className="mentalwellbeing-button">Start Journaling</button>
            </div>
            <div className="box-image journaling-image">
              {/* Image will be added via CSS */}
            </div>
          </div>

          {/* Second Box - Meditation */}
          <div className="mentalwellbeing-box meditation">
            <div className="box-content">
              <h2>Meditation</h2>
              <p>Calm your mind and find your inner peace.</p>
              <button onClick={handleMeditation} className="mentalwellbeing-button">Start Meditation</button>
            </div>
            <div className="box-image meditation-image">
              {/* Image will be added via CSS */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MentalWellbeing;