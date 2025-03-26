import React, { useState } from 'react';
import './Journaling.css';
import Sidebar from '../Sidebar';

const Journaling = ({ navigate }) => {
  const [thingsToDo, setThingsToDo] = useState(Array(10).fill(''));
  const [feelings, setFeelings] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [affirmations, setAffirmations] = useState('');

  const handleToDoChange = (index, value) => {
    const updatedThingsToDo = [...thingsToDo];
    updatedThingsToDo[index] = value;
    setThingsToDo(updatedThingsToDo);
  };

  const handleSave = () => {
    if (!feelings && !gratitude && !affirmations && thingsToDo.every(item => item === '')) {
      alert('Please write something in the journal before saving.');
    } else {
      alert('Journal entry saved successfully!');
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const moods = ['Joy', 'Annoyed', 'Worried',  
                 'Silly', 'Happy', 'Surprised', 
                 'Angry', 'Sleepy', 'Emotional', ];

  return (
    <div className="journaling-page-wrapper">
      <Sidebar />
      <div className="journaling-container">
        <h1 className="planner-title">Daily Planner</h1>
        <div className="date-day-container">
          <div className="small-text">
            <label>Day : </label>
            <div className="day-options">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="day-option">
                  <input type="radio" name="day" value={day} className="clickable" />
                  <label>{day}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="small-text">
            <label>Date : </label>
            <input type="date" className="clickable" />
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
              <textarea className="lined" rows="5" placeholder="Write your notes..." />
            </div>
            <div className="planner-section">
              <label className="section-label">Sleep Hours</label>
              <input type="number" className="sleep-input clickable" min="0" defaultValue="0" />
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
                    <input type="radio" name="mood" value={mood} className="clickable" />
                    <span role="img" aria-label={mood.toLowerCase()} style={{ marginRight: '8px' }}>
                      {mood === 'Happy' ? '😊' :
                        mood === 'Annoyed' ? '😒' :
                        mood === 'Worried' ? ' 😰' :
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
          <button className="back-button clickable" onClick={() => window.location.href = '/mentalwellbeing'}>Back</button>
          <button className="save-button clickable" onClick={handleSave}>Save Entry</button>
        </div>
      </div>
    </div>
  );
};

export default Journaling;
