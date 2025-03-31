import React, { useState } from 'react';
import './Journaling.css';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Journaling = () => {
  const [thingsToDo, setThingsToDo] = useState(Array(10).fill(''));
  const [feelings, setFeelings] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [affirmations, setAffirmations] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [notes, setNotes] = useState('');
  const [sleepHours, setSleepHours] = useState(0);
  const [selectedDay, setSelectedDay] = useState(''); // State for selected day
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // State for selected date

  const navigate = useNavigate();

  const handleToDoChange = (index, value) => {
    const updatedThingsToDo = [...thingsToDo];
    updatedThingsToDo[index] = value;
    setThingsToDo(updatedThingsToDo);
  };

  const handleSave = async () => {
    if (!feelings && !gratitude && !affirmations && thingsToDo.every(item => item === '')) {
      alert('Please write something in the journal before saving.');
      return;
    }

    if (!selectedDay) {
      alert('Please select a day before saving.');
      return;
    }

    if (!selectedDate) {
      alert('Please select a date before saving.');
      return;
    }

    const journalData = {
      UserEmail: localStorage.getItem('email'),
      date: selectedDate, // Use the selected date
      day: selectedDay, // Use the selected day
      thingsToDo,
      notes,
      sleepHours,
      feelings,
      gratitude,
      affirmations,
      mood: selectedMood
    };

    try {
      const response = await axios.post('http://localhost:5000/save-journal', journalData);
      if (response.data.success) {
        alert('Journal entry saved successfully!');

        // Reset the input fields
        setThingsToDo(Array(10).fill(''));
        setFeelings('');
        setGratitude('');
        setAffirmations('');
        setSelectedMood('');
        setNotes('');
        setSleepHours(0);
        setSelectedDay(''); // Reset the selected day
        setSelectedDate(new Date().toISOString().split('T')[0]); // Reset the selected date to today
      } else {
        alert('Failed to save journal entry. Please try again.');
      }
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('An error occurred while saving the journal entry.');
    }
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const moods = ['Joy', 'Annoyed', 'Worried', 'Silly', 'Happy', 'Surprised', 'Angry', 'Sleepy', 'Emotional'];

  return (
    <div className="log-main">
      <Sidebar />
      <div className="journaling-container">
        <h1 className="planner-title">Daily Planner</h1>
        <div className="date-day-container">
          <div className="small-text">
            <label>Day : </label>
            <div className="day-options">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="day-option">
                  <input
                    type="radio"
                    name="day"
                    value={day}
                    className="clickable"
                    checked={selectedDay === day} // Bind to selectedDay state
                    onChange={(e) => setSelectedDay(e.target.value)} // Update selectedDay on change
                  />
                  <label>{day}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="small-text">
            <label>Date : </label>
            <input
              type="date"
              className="clickable"
              value={selectedDate} // Bind to selectedDate state
              onChange={(e) => setSelectedDate(e.target.value)} // Update selectedDate on change
            />
          </div>
        </div>
        <div className="planner-columns">
          <div className="left-column">
            <div className="planner-section">
              <label className="section-label">Things To Do</label>
              <div className="things-to-do">
                {thingsToDo.map((item, index) => (
                  <div key={index} className="todo-item">
                    <input type="checkbox" className="clickable" />
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleToDoChange(index, e.target.value)}
                      placeholder={`Task ${index + 1}`}
                      className="todo-text"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="planner-section">
              <label className="section-label">Notes</label>
              <textarea
                className="lined"
                rows="5"
                placeholder="Write your notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="planner-section">
              <label className="section-label">Sleep Hours</label>
              <input
                type="number"
                className="sleep-input clickable"
                min="0"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
            </div>
          </div>
          <div className="right-column">
            <div className="planner-section">
              <label className="section-label">How Are You Feeling Today?</label>
              <textarea
                className="lined"
                rows="5"
                placeholder="Write your feelings..."
                value={feelings}
                onChange={(e) => setFeelings(e.target.value)}
              />
            </div>
            <div className="planner-section">
              <label className="section-label">Things You Are Grateful For</label>
              <textarea
                className="lined"
                rows="5"
                placeholder="Write what you're grateful for..."
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
              />
            </div>
            <div className="planner-section">
              <label className="section-label">Today's Affirmations</label>
              <textarea
                className="lined"
                rows="5"
                placeholder="Write your affirmations..."
                value={affirmations}
                onChange={(e) => setAffirmations(e.target.value)}
              />
            </div>
            <div className="planner-section">
              <label className="section-label">My Mood Today Is</label>
              <div className="mood-options">
                {moods.map((mood, index) => (
                  <div key={index} className="mood-option clickable">
                    <input
                      type="radio"
                      name="mood"
                      value={mood}
                      className="clickable"
                      checked={selectedMood === mood} // Bind to selectedMood state
                      onChange={(e) => setSelectedMood(e.target.value)} // Update selectedMood on change
                    />
                    <span role="img" aria-label={mood.toLowerCase()} style={{ marginRight: '8px' }}>
                      {mood === 'Happy' ? '😊' :
                        mood === 'Annoyed' ? '😒' :
                        mood === 'Worried' ? '😰' :
                        mood === 'Joy' ? '😁' :
                        mood === 'Emotional' ? '😭' :
                        mood === 'Silly' ? '😜' :
                        mood === 'Sleepy' ? '😴' :
                        mood === 'Surprised' ? '😲' :
                        '😠'}
                    </span>
                    <label>{mood}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="button-group">
          <button className="save-button clickable" onClick={handleSave}>Save</button>
          <button className="view-button clickable" onClick={() => navigate('/journal-history')}>View</button>
        </div>
      </div>
    </div>
  );
};

export default Journaling;