import React, { useState, useEffect } from 'react';
import './WorkoutHistory.css';
import Sidebar from './Sidebar';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [filter, setFilter] = useState({
    workoutType: '',
    bodyPart: '',
    dateRange: 'all'
  });
  
  // Workout types and body parts for filter dropdowns
  const workoutTypes = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Pilates', 'Functional'];
  const bodyParts = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  // Mock data - in a real app, this would come from an API or local storage
  useEffect(() => {
    // Simulate fetching data
    const mockWorkouts = [
      {
        id: 1,
        date: '2025-03-18',
        workoutType: 'Strength',
        bodyPart: 'Chest',
        sets: [
          { exercise: 'Bench Press', weight: '80', reps: '8' },
          { exercise: 'Incline Press', weight: '60', reps: '10' },
          { exercise: 'Cable Flyes', weight: '15', reps: '12' }
        ]
      },
      {
        id: 2,
        date: '2025-03-15',
        workoutType: 'Cardio',
        bodyPart: 'Full Body',
        sets: [
          { exercise: 'Running', duration: '30', distance: '5', calories: '350' }
        ]
      },
      {
        id: 3,
        date: '2025-03-10',
        workoutType: 'HIIT',
        bodyPart: 'Full Body',
        sets: [
          { exercise: 'Burpees', duration: '10', intensity: 'High' },
          { exercise: 'Mountain Climbers', duration: '10', intensity: 'Medium' }
        ]
      },
      {
        id: 4,
        date: '2025-03-05',
        workoutType: 'Yoga',
        bodyPart: 'Core',
        sets: [
          { exercise: 'Sun Salutation', duration: '20' },
          { exercise: 'Warrior Pose', duration: '15' }
        ]
      },
      {
        id: 5,
        date: '2025-02-28',
        workoutType: 'Strength',
        bodyPart: 'Legs',
        sets: [
          { exercise: 'Squats', weight: '100', reps: '10' },
          { exercise: 'Leg Press', weight: '150', reps: '12' },
          { exercise: 'Lunges', weight: '20', reps: '15' }
        ]
      }
    ];

    setWorkouts(mockWorkouts);
    setFilteredWorkouts(mockWorkouts);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...workouts];
    
    // Filter by workout type
    if (filter.workoutType && filter.workoutType !== 'All') {
      result = result.filter(workout => workout.workoutType === filter.workoutType);
    }
    
    // Filter by body part
    if (filter.bodyPart && filter.bodyPart !== 'All') {
      result = result.filter(workout => workout.bodyPart === filter.bodyPart);
    }
    
    // Filter by date range
    if (filter.dateRange !== 'all') {
      const today = new Date();
      let startDate = new Date();
      
      switch (filter.dateRange) {
        case 'week':
          startDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(today.getMonth() - 1);
          break;
        case '3months':
          startDate.setMonth(today.getMonth() - 3);
          break;
        default:
          break;
      }
      
      result = result.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= startDate && workoutDate <= today;
      });
    }
    
    setFilteredWorkouts(result);
  }, [filter, workouts]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render sets based on workout type
  const renderSets = (sets, workoutType) => {
    if (!sets || sets.length === 0) return null;

    switch (workoutType) {
      case 'Strength':
        return (
          <table className="history-sets-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Weight (kg)</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index}>
                  <td>{set.exercise}</td>
                  <td>{set.weight}</td>
                  <td>{set.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Cardio':
        return (
          <table className="history-sets-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index}>
                  <td>{set.exercise}</td>
                  <td>{set.duration}</td>
                  <td>{set.distance || 'N/A'}</td>
                  <td>{set.calories || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'HIIT':
        return (
          <table className="history-sets-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Duration (min)</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index}>
                  <td>{set.exercise}</td>
                  <td>{set.duration}</td>
                  <td>{set.intensity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Yoga':
      case 'Pilates':
        return (
          <table className="history-sets-table">
            <thead>
              <tr>
                <th>Pose/Exercise</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index}>
                  <td>{set.exercise}</td>
                  <td>{set.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Functional':
        return (
          <table className="history-sets-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Reps</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index}>
                  <td>{set.exercise}</td>
                  <td>{set.reps || 'N/A'}</td>
                  <td>{set.duration || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return (
          <table className="history-sets-table">
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((set, index) => (
                <tr key={index}>
                  <td>{set.exercise}</td>
                  <td>Various</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="history-main">
      <Sidebar />
      
      <div className="workout-history">
        <h1 className="history-title">Workout History</h1>
        
        <div className="filter-container">
          <div className="filter-field">
            <label>Workout Type</label>
            <select
              name="workoutType"
              value={filter.workoutType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              {workoutTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-field">
            <label>Body Part</label>
            <select
              name="bodyPart"
              value={filter.bodyPart}
              onChange={handleFilterChange}
            >
              <option value="">All Body Parts</option>
              {bodyParts.map((part) => (
                <option key={part} value={part}>{part}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-field">
            <label>Date Range</label>
            <select
              name="dateRange"
              value={filter.dateRange}
              onChange={handleFilterChange}
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="workouts-container">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <div key={workout.id} className="workout-card">
                <div className="workout-header">
                  <div className="workout-date">{formatDate(workout.date)}</div>
                  <div className="workout-badges">
                    <span className="workout-type-badge">{workout.workoutType}</span>
                    <span className="workout-part-badge">{workout.bodyPart}</span>
                  </div>
                </div>
                <div className="workout-details">
                  {renderSets(workout.sets, workout.workoutType)}
                </div>
              </div>
            ))
          ) : (
            <div className="no-workouts">
              <p>No workouts found matching your filters.</p>
            </div>
          )}
        </div>
        
        <div className="bottom-buttons">
          <button className="workout-button back" onClick={() => window.history.back()}>Back</button>
          <button className="workout-button export">Export Data</button>
        </div>
      </div>
    </div>

  );
};

export default WorkoutHistory;