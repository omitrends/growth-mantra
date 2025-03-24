import { useState, useEffect } from 'react';
import './LogWorkout.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import React from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';

const LogWorkout = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [workoutType, setWorkoutType] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState([]);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [calories, setCalories] = useState('');
  const [intensity, setIntensity] = useState('');
  const [exerciseSuggestions, setExerciseSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');
  const [exercisesData, setExercisesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const workoutTypes = ['Strength', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'Functional'];
  const bodyParts = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];
  const intensityLevels = ['Low', 'Medium', 'High'];

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

 const addSet = () => {
  if (!exerciseName) { // Check if exerciseName is empty
    alert("Please enter an exercise name");
    return;
  }

  let newSet = { id: Date.now(), exercise: exerciseName }; // Set exerciseName instead of exercise
  let isValid = true;

  switch (workoutType) {
    case "Strength":
      if (!weight || !reps) {
        alert("Please enter weight and reps");
        isValid = false;
      } else {
        newSet = { ...newSet, weight, reps };
      }
      break;
    case "Cardio":
      if (!duration && !distance) {
        alert("Please enter duration or distance");
        isValid = false;
      } else {
        newSet = {
          ...newSet,
          duration: duration || "N/A",
          distance: distance || "N/A",
          calories: calories || "N/A",
        };
      }
      break;
    case "HIIT":
      if (!duration || !intensity) {
        alert("Please enter duration and intensity");
        isValid = false;
      } else {
        newSet = { ...newSet, duration, intensity };
      }
      break;
    case "Yoga":
    case "Pilates":
      if (!duration) {
        alert("Please enter duration");
        isValid = false;
      } else {
        newSet = { ...newSet, duration };
      }
      break;
    case "Functional":
      if (!reps && !duration) {
        alert("Please enter reps or duration");
        isValid = false;
      } else {
        newSet = { ...newSet, reps: reps || "N/A", duration: duration || "N/A" };
      }
      break;
    default:
      alert("Please select a workout type");
      isValid = false;
  }

  if (isValid) {
    setSets([...sets, newSet]);
    // Reset the fields after adding the set
    setExerciseName(""); // Clear the exercise input field
    setWeight("");
    setReps("");
    setDuration("");
    setDistance("");
    setCalories("");
    setIntensity("");
  }
};

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

  useEffect(() => {
    Papa.parse('/server/data/Exercise.csv', {
      download: true,
      complete: (result) => {
        setExercisesData(result.data); // Store CSV data
      },
      header: true, // Treat the first row as the header
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutData = {
      UserEmail: email,
      workoutType,
      bodyPart,
      sets: sets.map(set => ({
        exercise: set.exercise,
        weight: set.weight || null,
        reps: set.reps || null,
        duration: set.duration || null,
        distance: set.distance || null,
        calories: set.calories || null,
        intensity: set.intensity || null
      }))
    };

    try {
      const response = await axios.post("http://localhost:5000/logWorkout", workoutData, {
        headers: { "Content-Type": "application/json" }
      });
      toast.success('Workout logged successfully!', { autoClose: 3000 });
    } catch (error) {
      toast.error('Error logging workout!', { autoClose: 3000 });
    }
  };

  const handleView = () => {
    navigate('/workout-history');
  };

  const handleSearch = (searchQuery) => {
    setExerciseName(searchQuery); // Update input field value

    if (searchQuery.trim() === "") {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }

    // Filter exercises based on the input, ensuring 'ExerciseName' is valid
    const filteredSuggestions = exercisesData.filter(exercise =>
      exercise.ExerciseName && exercise.ExerciseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSuggestions(filteredSuggestions); // Update suggestions
  };

  // Set selected exercise when clicked
  const handleExerciseSelect = (exercise) => {
    setExerciseName(exercise.ExerciseName); // Set selected exercise name
    setSuggestions([]); // Clear suggestions after selection
  };


  const renderInputFields = () => {
    switch (workoutType) {
      case 'Strength':
        return (
          <>
            <div className="input-field">
              <label>Exercise</label>
              <input 
                type="text" 
                value={exerciseName} 
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="E.g., Bench Press"
              />
             {suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((exercise, index) => (
      <li 
        key={index} 
        onClick={() => handleExerciseSelect(exercise)}
      >
        {exercise.ExerciseName}
      </li>
    ))}
  </ul>
)}
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
                value={exerciseName} 
                onChange={(e) => handleSearch(e.target.value)} 
                placeholder="E.g., Running, Cycling"
              />
            {suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((exercise, index) => (
      <li 
        key={index} 
        onClick={() => handleExerciseSelect(exercise)}
      >
        {exercise.ExerciseName}
      </li>
    ))}
  </ul>
)}
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
                value={exerciseName} 
                onChange={(e) => handleSearch(e.target.value)} 
                placeholder="E.g., Burpees"
              />
              {suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((exercise, index) => (
      <li 
        key={index} 
        onClick={() => handleExerciseSelect(exercise)}
      >
        {exercise.ExerciseName}
      </li>
    ))}
  </ul>
)}
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
                value={exerciseName} 
                onChange={(e) => handleSearch(e.target.value)} 
                placeholder={workoutType === 'Yoga' ? "E.g., Downward Dog" : "E.g., Hundred"}
              />
{suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((exercise, index) => (
      <li 
        key={index} 
        onClick={() => handleExerciseSelect(exercise)}
      >
        {exercise.ExerciseName}
      </li>
    ))}
  </ul>
)}
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
                value={exerciseName} 
                onChange={(e) => handleSearch(e.target.value)} 
                placeholder="E.g., Box Jumps"
              />
{suggestions.length > 0 && (
  <ul className="suggestions-list">
    {suggestions.map((exercise, index) => (
      <li 
        key={index} 
        onClick={() => handleExerciseSelect(exercise)}
      >
        {exercise.ExerciseName}
      </li>
    ))}
  </ul>
)}
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
      <ToastContainer />
    </div>
  );
};

export default LogWorkout;