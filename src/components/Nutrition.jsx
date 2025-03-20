import './Nutrition.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router';

const Nutrition = () => {
  const navigate = useNavigate();

  function handleViewPlan() {
    navigate('/recommended-plans-nutrition');
  }

  function handleLog() {
    navigate('/nutrition-logs');
  }

  return (
    <div className="nutrition-container">
      <Sidebar />
      <div className="nutrition-content">
        <div className='title-box'>
          <h1 className="nutrition-title">NUTRITION</h1>
        </div>
        <div className="nutrition-boxes">
          {/* First Box - Log Your Meals */}
          <div className="nutrition-box meal-log">
            <div className="box-content">
              <h2>Log Your Meals</h2>
              <p>Keep track of your daily nutrition and meals</p>
              <button onClick={handleLog} className="nutrition-button">Log Meals</button>
            </div>
            <div className="box-image meal-image">
              {/* Image will be added via CSS */}
            </div>
          </div>

          {/* Second Box - Recommended Plans */}
          <div className="nutrition-box recommended-plans">
            <div className="box-content">
              <h2>Recommended Plans</h2>
              <p>Discover nutrition plans tailored for your goals</p>
              <button onClick={handleViewPlan} className="nutrition-button">View Plans</button>
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

export default Nutrition;