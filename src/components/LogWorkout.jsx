import React, { useState } from 'react';
import './LogWorkout.css';
import Sidebar from './Sidebar';
import {useNavigate} from 'react-router-dom'
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
const LogWorkout = () => {

  const navigate = useNavigate();

  const [workoutType, setWorkoutType] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState([]);
  
  // Fields for different workout types
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [intensity, setIntensity] = useState('');

  // Workout types and body parts for dropdown menus
  const workoutTypes = ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'Functional'];
  const bodyParts = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];
  const intensityLevels = ['Low', 'Medium', 'High'];

  // Reset input fields when workout type changes
  useEffect(() => {
    setExercise('');
    setWeight('');
    setReps('');
    setDuration('');
    setDistance('');
    setCalories('');
    setIntensity('');
    setSets([]);
  }, [workoutType]);

  const addSet = () => {
    if (!exercise) {
      alert('Please enter an exercise name');
      return;
    }

    let newSet = { id: Date.now(), exercise };
    let isValid = true;

    switch (workoutType) {
      case 'Strength':
        if (!weight || !reps) {
          alert('Please enter weight and reps');
          isValid = false;
        } else {
          newSet = { ...newSet, weight, reps };
        }
        break;
      case 'Cardio':
        if (!duration && !distance) {
          alert('Please enter duration or distance');
          isValid = false;
        } else {
          newSet = { ...newSet, duration: duration || 'N/A', distance: distance || 'N/A', calories: calories || 'N/A' };
        }
        break;
      case 'HIIT':
        if (!duration || !intensity) {
          alert('Please enter duration and intensity');
          isValid = false;
        } else {
          newSet = { ...newSet, duration, intensity };
        }
        break;
      case 'Yoga':
      case 'Pilates':
        if (!duration) {
          alert('Please enter duration');
          isValid = false;
        } else {
          newSet = { ...newSet, duration };
        }
        break;
      case 'Functional':
        if (!reps && !duration) {
          alert('Please enter reps or duration');
          isValid = false;
        } else {
          newSet = { ...newSet, reps: reps || 'N/A', duration: duration || 'N/A' };
        }
        break;
      default:
        alert('Please select a workout type');
        isValid = false;
    }

    if (isValid) {
      setSets([...sets, newSet]);
      // Clear inputs after adding
      setExercise('');
      setWeight('');
      setReps('');
      setDuration('');
      setDistance('');
      setCalories('');
      setIntensity('');
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
      setDuration('');
      setDistance('');
      setCalories('');
      setIntensity('');
      setSets([]);
    } else {
      alert('Please enter workout details and add at least one set');
    }
  };

  const handleView = () => {
    // This would typically navigate to a view showing all logged workouts
    
    navigate('/workout-history');
    
  };

  // Render input fields based on workout type
  const renderInputFields = () => {
    switch (workoutType) {
      case 'Strength':
        return (
          <>
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
          </>
        );
      case 'Cardio':
        return (
          <>
            <div className="input-field">
              <label>Exercise</label>
              <input 
                type="text" 
                value={exercise} 
                onChange={(e) => setExercise(e.target.value)} 
                placeholder="E.g., Running, Cycling"
              />
            </div>
            <div className="input-field">
              <label>Duration (min)</label>
              <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                placeholder="E.g., 30"
              />
            </div>
            <div className="input-field">
              <label>Distance (km)</label>
              <input 
                type="number" 
                value={distance} 
                onChange={(e) => setDistance(e.target.value)} 
                placeholder="E.g., 5"
              />
            </div>
            <div className="input-field">
              <label>Calories</label>
              <input 
                type="number" 
                value={calories} 
                onChange={(e) => setCalories(e.target.value)} 
                placeholder="E.g., 300"
              />
            </div>
          </>
        );
      case 'HIIT':
        return (
          <>
            <div className="input-field">
              <label>Exercise</label>
              <input 
                type="text" 
                value={exercise} 
                onChange={(e) => setExercise(e.target.value)} 
                placeholder="E.g., Burpees"
              />
            </div>
            <div className="input-field">
              <label>Duration (min)</label>
              <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                placeholder="E.g., 45"
              />
            </div>
            <div  className="input-field ">
              <label>Intensity</label>
              <select
                style={{ height: "48px", border : "1 px solid grey"}}
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
              >
                <option value="">Select Intensity</option>
                {intensityLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </>
        );
      case 'Yoga':
      case 'Pilates':
        return (
          <>
            <div className="input-field">
              <label>Pose/Exercise</label>
              <input 
                type="text" 
                value={exercise} 
                onChange={(e) => setExercise(e.target.value)} 
                placeholder={workoutType === 'Yoga' ? "E.g., Downward Dog" : "E.g., Hundred"}
              />
            </div>
            <div className="input-field">
              <label>Duration (min)</label>
              <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                placeholder="E.g., 60"
              />
            </div>
          </>
        );
      case 'Functional':
        return (
          <>
            <div className="input-field">
              <label>Exercise</label>
              <input 
                type="text" 
                value={exercise} 
                onChange={(e) => setExercise(e.target.value)} 
                placeholder="E.g., Box Jumps"
              />
            </div>
            <div className="input-field">
              <label>Reps</label>
              <input 
                type="number" 
                value={reps} 
                onChange={(e) => setReps(e.target.value)} 
                placeholder="E.g., 15"
              />
            </div>
            <div className="input-field">
              <label>Duration (min)</label>
              <input 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                placeholder="E.g., 20"
              />
            </div>
          </>
        );
      default:
        return (
          <div className="input-field full-width">
            <p>Select a workout type to continue</p>
          </div>
        );
    }
  };

  // Render table headers based on workout type
  const renderTableHeaders = () => {
    switch (workoutType) {
      case 'Strength':
        return (
          <tr>
            <th>Exercise</th>
            <th>Weight (kg)</th>
            <th>Reps</th>
          </tr>
        );
      case 'Cardio':
        return (
          <tr>
            <th>Exercise</th>
            <th>Duration (min)</th>
            <th>Distance (km)</th>
            <th>Calories</th>
          </tr>
        );
      case 'HIIT':
        return (
          <tr>
            <th>Exercise</th>
            <th>Duration (min)</th>
            <th>Intensity</th>
          </tr>
        );
      case 'Yoga':
      case 'Pilates':
        return (
          <tr>
            <th>Pose/Exercise</th>
            <th>Duration (min)</th>
          </tr>
        );
      case 'Functional':
        return (
          <tr>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Duration (min)</th>
          </tr>
        );
      default:
        return (
          <tr>
            <th>Exercise</th>
            <th>Details</th>
          </tr>
        );
    }
  };

  // Render table rows based on workout type
  const renderTableRows = () => {
    return sets.map((set) => {
      switch (workoutType) {
        case 'Strength':
          return (
            <tr key={set.id}>
              <td>{set.exercise}</td>
              <td>{set.weight}</td>
              <td>{set.reps}</td>
            </tr>
          );
        case 'Cardio':
          return (
            <tr key={set.id}>
              <td>{set.exercise}</td>
              <td>{set.duration}</td>
              <td>{set.distance}</td>
              <td>{set.calories}</td>
            </tr>
          );
        case 'HIIT':
          return (
            <tr key={set.id}>
              <td>{set.exercise}</td>
              <td>{set.duration}</td>
              <td>{set.intensity}</td>
            </tr>
          );
        case 'Yoga':
        case 'Pilates':
          return (
            <tr key={set.id}>
              <td>{set.exercise}</td>
              <td>{set.duration}</td>
            </tr>
          );
        case 'Functional':
          return (
            <tr key={set.id}>
              <td>{set.exercise}</td>
              <td>{set.reps}</td>
              <td>{set.duration}</td>
            </tr>
          );
        default:
          return (
            <tr key={set.id}>
              <td>{set.exercise}</td>
              <td>N/A</td>
            </tr>
          );
      }
    });
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
          
          <button className="add-set-button" onClick={addSet}>Add Set</button>
        </div>
        
        <div className="input-container">
          {renderInputFields()}
        </div>
        
        {sets.length > 0 && (
          <div className="sets-container">
            <h2>Sets</h2>
            <table className="sets-table">
              <thead>
                {renderTableHeaders()}
              </thead>
              <tbody>
                {renderTableRows()}
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