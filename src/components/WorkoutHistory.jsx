import React from "react";
import { useState, useEffect } from 'react';
import './WorkoutHistory.css';
import Sidebar from './Sidebar';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const WorkoutHistory = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [email, setEmail] = useState("");
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

  const fetchWorkouts = async (storedEmail) => {
    try {
      const response = await axios.get('http://localhost:5000/getWorkouts', {
        params: { UserEmail: storedEmail }  // Pass the stored email here
      });

      if (response.data.success) {
        console.log('Fetched Workouts:', response.data.workouts); // Debugging log
        setWorkouts(response.data.workouts);
      } else {
        console.error('Error fetching workouts:', response.data.message);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      fetchWorkouts(storedEmail); // Call fetchWorkouts with the stored email
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  // Apply filters
  useEffect(() => {
    let result = [...workouts];

    if (filter.workoutType && filter.workoutType !== 'All') {
      result = result.filter(workout => workout.WorkoutType === filter.workoutType);
    }

    if (filter.bodyPart && filter.bodyPart !== 'All') {
      result = result.filter(workout => workout.BodyPart === filter.bodyPart);
    }

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
        const workoutDate = new Date(workout.WorkoutDate);
        return workoutDate >= startDate && workoutDate <= today;
      });
    }

    setFilteredWorkouts(result);
  }, [filter, workouts]);

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

    console.log('Rendering sets for workout type:', workoutType); // Debugging log
    console.log('Sets:', sets); // Debugging log

    const renderTableHeader = (columns) => (
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
    );

    const renderTableBody = (sets, columns) => (
      <tbody>
        {sets.map((set, index) => (
          <tr key={index}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {set[col] !== null && set[col] !== undefined ? set[col] : 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );

    switch (workoutType) {
      case 'Strength':
        return (
          <table className="history-sets-table">
            {renderTableHeader(['Exercise', 'Weight', 'Reps'])}
            {renderTableBody(sets, ['Exercise', 'Weight', 'Reps'])}
          </table>
        );
      case 'Cardio':
        return (
          <table className="history-sets-table">
            {renderTableHeader(['Exercise', 'Duration', 'Distance', 'Calories'])}
            {renderTableBody(sets, ['Exercise', 'Duration', 'Distance', 'Calories'])}
          </table>
        );
      case 'HIIT':
        return (
          <table className="history-sets-table">
            {renderTableHeader(['Exercise', 'Duration', 'Intensity'])}
            {renderTableBody(sets, ['Exercise', 'Duration', 'Intensity'])}
          </table>
        );
      case 'Yoga':
      case 'Pilates':
        return (
          <table className="history-sets-table">
            {renderTableHeader(['Pose/Exercise', 'Duration'])}
            {renderTableBody(sets, ['Exercise', 'Duration'])}
          </table>
        );
      case 'Functional':
        return (
          <table className="history-sets-table">
            {renderTableHeader(['Exercise', 'Reps', 'Duration'])}
            {renderTableBody(sets, ['Exercise', 'Reps', 'Duration'])}
          </table>
        );
      default:
        return (
          <table className="history-sets-table">
            {renderTableHeader(['Exercise', 'Details'])}
            {renderTableBody(sets, ['Exercise', 'Details'])}
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
              <div key={workout.WorkoutId} className="workout-card">
                <div className="workout-header">
                  <div className="workout-date">{formatDate(workout.WorkoutDate)}</div>
                  <div className="workout-badges">
                    <span className="workout-type-badge">{workout.WorkoutType}</span>
                    <span className="workout-part-badge">{workout.BodyPart}</span>
                  </div>
                </div>

                {/* Render workout details by default */}
                <div className="workout-details">
                  {renderSets(workout.sets, workout.WorkoutType)} {/* Render sets directly */}
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
          {/* <button className="workout-button export">Export Data</button> */}
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;