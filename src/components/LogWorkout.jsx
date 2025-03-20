import { useState } from 'react';
import './LogWorkout.css';
import Sidebar from './Sidebar';

const LogWorkout = () => {
  const [workoutType, setWorkoutType] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState([]);

  // Workout types and body parts for dropdown menus
  const workoutTypes = ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'Functional'];
  const bodyParts = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];

  const addSet = () => {
    if (exercise && weight && reps) {
      const newSet = {
        id: Date.now(),
        exercise,
        weight,
        reps
      };
      setSets([...sets, newSet]);
      // Clear inputs after adding
      setExercise('');
      setWeight('');
      setReps('');
    }
  };

  const handleSubmit = () => {
    if (sets.length > 0 && workoutType && bodyPart) {
      // Here you would typically send the data to a server
      alert('Workout logged successfully!');
      // Clear all inputs and sets
      setWorkoutType('');
      setBodyPart('');
      setExercise('');
      setWeight('');
      setReps('');
      setSets([]);
    } else {
      alert('Please enter workout details and add at least one set');
    }
  };

  const handleView = () => {
    // This would typically navigate to a view showing all logged workouts
    alert('Navigating to workout history');
  };

  return (
    <div className="log-main">
        <Sidebar/>
      <div className="log-workout">
      <h1 className="log-title">Log Workout</h1>
      
      <div className="dropdown-container">
        <div className="dropdown-field">
          <label>Workout Type</label>
          <select 
            value={workoutType} 
            onChange={(e) => setWorkoutType(e.target.value)}
          >
            <option value="">Select Type</option>
            {workoutTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="dropdown-field">
          <label>Body Part</label>
          <select 
            value={bodyPart} 
            onChange={(e) => setBodyPart(e.target.value)}
          >
            <option value="">Select Body Part</option>
            {bodyParts.map((part) => (
              <option key={part} value={part}>{part}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="input-container">
        <div className="input-field">
          <label>Exercise</label>
          <input 
            type="text" 
            value={exercise} 
            onChange={(e) => setExercise(e.target.value)} 
            placeholder="E.g., Bench Press"
          />
        </div>
        
        <div className="input-field">
          <label>Weight (kg)</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="E.g., 60"
          />
        </div>
        
        <div className="input-field">
          <label>Reps</label>
          <input 
            type="number" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)} 
            placeholder="E.g., 12"
          />
        </div>
      </div>
      
      <div className="button-container">
        <button className="add-set-button" onClick={addSet}>Add Set</button>
        <button className="enter-button" onClick={addSet}>Enter</button>
      </div>
      
      {sets.length > 0 && (
        <div className="sets-container">
          <h2>Sets</h2>
          <table className="sets-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight (kg)</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set) => (
                <tr key={set.id}>
                  <td>{set.exercise}</td>
                  <td>{set.weight}</td>
                  <td>{set.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="bottom-buttons">
        <button className="workout-button submit" onClick={handleSubmit}>Submit</button>
        <button className="workout-button view" onClick={handleView}>View</button>
      </div>
    </div>
</div>
  );
};

export default LogWorkout;