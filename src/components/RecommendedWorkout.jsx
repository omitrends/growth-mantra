import { useState } from 'react';
import './RecommendedWorkout.css';
import React from "react";
import Sidebar from '../components/Sidebar';

const RecommendedWorkout = () => {
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [split, setSplit] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState('');

  // Options for dropdown menus
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const workoutTypes = ['Strength', 'Hypertrophy', 'Endurance', 'Functional', 'HIIT', 'Calisthenics'];
  const splitOptions = [
    { value: '1', label: '1 Day (Full Body)' },
    { value: '2', label: '2 Day Split' },
    { value: '3', label: '3 Day Split' },
    { value: '4', label: '4 Day Split' },
    { value: '5', label: '5 Day Split' },
    { value: '6', label: '6 Day Split (PPL)' }
  ];

  // Sample workout plans - in a real app, these would come from a database
  const workoutPlans = {
    beginner: {
      strength: {
        '1': {
          title: 'Beginner Full Body Strength',
          frequency: '3 times per week',
          exercises: [
            'Squats: 3 sets x 8-10 reps',
            'Push-ups: 3 sets x 8-12 reps',
          ]
        },
        '3': {
          title: 'Beginner 3-Day Split',
          frequency: 'Each workout once per week',
          days: [
            {
              name: 'Day 1 - Lower Body',
              exercises: [
                'Squats: 3 sets x 10 reps',
                'Lunges: 3 sets x 10 reps per leg',
              ]
            },
            {
              name: 'Day 2 - Push (Chest/Shoulders/Triceps)',
              exercises: [
                'Push-ups: 3 sets x 10 reps',
                'Dumbbell Shoulder Press: 3 sets x 10 reps',
              ]
            },
            {
              name: 'Day 3 - Pull (Back/Biceps)',
              exercises: [
                'Assisted Pull-ups: 3 sets x 8 reps',
                'Dumbbell Rows: 3 sets x 10 reps',
              ]
            }
          ]
        }
      },
      hypertrophy: {
        '3': {
          title: 'Beginner Hypertrophy 3-Day Split',
          frequency: 'Each workout once per week',
          days: [
            {
              name: 'Day 1 - Chest & Triceps',
              exercises: [
                'Bench Press: 3 sets x 8-12 reps',
                'Incline Dumbbell Press: 3 sets x 10-12 reps',
                'Chest Flyes: 3 sets x 12-15 reps',
              ]
            },
            {
              name: 'Day 2 - Back & Biceps',
              exercises: [
                'Lat Pulldowns: 3 sets x 10-12 reps',
                'Seated Cable Rows: 3 sets x 10-12 reps',
              ]
            },
            {
              name: 'Day 3 - Legs & Shoulders',
              exercises: [
                'Goblet Squats: 3 sets x 10-12 reps',
                'Leg Press: 3 sets x 10-12 reps',
              ]
            }
          ]
        }
      },
      endurance: {
        '2': {
          title: 'Beginner Endurance 2-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Cardio & Core',
              exercises: [
                'Running: 20-30 minutes',
                'Cycling: 20-30 minutes',
              ]
            },
            {
              name: 'Day 2 - Full Body Circuit',
              exercises: [
                'Jump Squats: 3 sets x 15 reps',
                'Burpees: 3 sets x 10 reps',
              ]
            }
          ]
        }
      },
      functional: {
        '2': {
          title: 'Beginner Functional 2-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Full Body Functional',
              exercises: [
                'Kettlebell Swings: 3 sets x 15 reps',
                'Box Jumps: 3 sets x 10 reps',
              ]
            },
            {
              name: 'Day 2 - Core & Stability',
              exercises: [
                'Plank: 3 sets x 30 seconds',
                'Side Plank: 3 sets x 20 seconds per side'
              ]
            }
          ]
        }
      },
      hiit: {
        '2': {
          title: 'Beginner HIIT 2-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Cardio HIIT',
              exercises: [
                'Jump Squats: 30 seconds',
                'Burpees: 30 seconds',
              ]
            },
            {
              name: 'Day 2 - Strength HIIT',
              exercises: [
                'Push-ups: 30 seconds',
                'Lunges: 30 seconds',
              ]
            }
          ]
        }
      },
      calisthenics: {
        '2': {
          title: 'Beginner Calisthenics 2-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Upper Body',
              exercises: [
                'Push-ups: 3 sets x 10-12 reps',
                'Pull-ups: 3 sets x 6-8 reps'
              ]
            },
            {
              name: 'Day 2 - Lower Body',
              exercises: [
                'Bodyweight Squats: 3 sets x 12-15 reps',
                'Lunges: 3 sets x 10 reps per leg',
              ]
            }
          ]
        }
      }
    },
    intermediate: {
      strength: {
        '4': {
          title: 'Intermediate 4-Day Split',
          frequency: 'Each workout once per week',
          days: [
            {
              name: 'Day 1 - Chest & Triceps',
              exercises: [
                'Bench Press: 4 sets x 6-8 reps',
                'Incline Bench Press: 4 sets x 8-10 reps'
              ]
            },
            {
              name: 'Day 2 - Back & Biceps',
              exercises: [
                'Deadlifts: 4 sets x 6-8 reps',
                'Pull-ups: 4 sets x 8-10 reps',
              ]
            },
            {
              name: 'Day 3 - Rest Day',
              exercises: [
                'Light cardio or mobility work'
              ]
            },
            {
              name: 'Day 4 - Legs',
              exercises: [
                'Squats: 4 sets x 6-8 reps',
                'Romanian Deadlifts: 4 sets x 8-10 reps',
              ]
            },
            {
              name: 'Day 5 - Shoulders',
              exercises: [
                'Overhead Press: 4 sets x 6-8 reps',
                'Lateral Raises: 4 sets x 10-12 reps'
              ]
            }
          ]
        }
      },
      hypertrophy: {
        '5': {
          title: 'Intermediate Hypertrophy 5-Day Split',
          frequency: 'Each workout once per week',
          days: [
            {
              name: 'Day 1 - Chest',
              exercises: [
                'Bench Press: 4 sets x 8-12 reps',
                'Incline Dumbbell Press: 4 sets x 10-12 reps'
              ]
            },
            {
              name: 'Day 2 - Back',
              exercises: [
                'Deadlifts: 4 sets x 8-10 reps',
                'Pull-ups: 4 sets x 8-10 reps'
              ]
            },
            {
              name: 'Day 3 - Shoulders',
              exercises: [
                'Overhead Press: 4 sets x 8-12 reps',
                'Lateral Raises: 4 sets x 12-15 reps'
              ]
            },
            {
              name: 'Day 4 - Legs',
              exercises: [
                'Squats: 4 sets x 8-12 reps',
                'Leg Press: 4 sets x 10-12 reps'
              ]
            },
            {
              name: 'Day 5 - Arms',
              exercises: [
                'Barbell Curls: 4 sets x 10-12 reps',
                'Hammer Curls: 4 sets x 12-15 reps'
              ]
            }
          ]
        }
      },
      endurance: {
        '3': {
          title: 'Intermediate Endurance 3-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Cardio & Core',
              exercises: [
                'Running: 30-40 minutes',
                'Cycling: 30-40 minutes'
              ]
            },
            {
              name: 'Day 2 - Full Body Circuit',
              exercises: [
                'Jump Squats: 3 sets x 20 reps',
                'Burpees: 3 sets x 15 reps'
              ]
            },
            {
              name: 'Day 3 - Interval Training',
              exercises: [
                'Sprints: 30 seconds (repeat 10 times)',
                'Rest: 1 minute between sprints'
              ]
            }
          ]
        }
      },
      functional: {
        '3': {
          title: 'Intermediate Functional 3-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Full Body Functional',
              exercises: [
                'Kettlebell Swings: 4 sets x 20 reps',
                'Box Jumps: 4 sets x 12 reps'
              ]
            },
            {
              name: 'Day 2 - Core & Stability',
              exercises: [
                'Plank: 4 sets x 45 seconds',
                'Side Plank: 4 sets x 30 seconds per side'
              ]
            },
            {
              name: 'Day 3 - Agility & Speed',
              exercises: [
                'Ladder Drills: 4 sets x 30 seconds',
                'Cone Drills: 4 sets x 30 seconds'
              ]
            }
          ]
        }
      },
      hiit: {
        '3': {
          title: 'Intermediate HIIT 3-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Cardio HIIT',
              exercises: [
                'Jump Squats: 40 seconds',
                'Burpees: 40 seconds'
              ]
            },
            {
              name: 'Day 2 - Strength HIIT',
              exercises: [
                'Push-ups: 40 seconds',
                'Lunges: 40 seconds'
              ]
            },
            {
              name: 'Day 3 - Tabata',
              exercises: [
                '20 seconds work, 10 seconds rest (repeat 8 rounds)',
                'Exercises: Jump Squats, Burpees, Mountain Climbers, High Knees'
              ]
            }
          ]
        }
      },
      calisthenics: {
        '3': {
          title: 'Intermediate Calisthenics 3-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Upper Body',
              exercises: [
                'Push-ups: 4 sets x 12-15 reps',
                'Pull-ups: 4 sets x 8-10 reps',
                'Dips: 4 sets x 10-12 reps',
                'Plank: 4 sets x 45 seconds'
              ]
            },
            {
              name: 'Day 2 - Lower Body',
              exercises: [
                'Bodyweight Squats: 4 sets x 15-20 reps',
                'Lunges: 4 sets x 12 reps per leg',
                'Step-ups: 4 sets x 15 reps per leg',
                'Calf Raises: 4 sets x 20-25 reps'
              ]
            },
            {
              name: 'Day 3 - Core & Flexibility',
              exercises: [
                'Hanging Leg Raises: 4 sets x 12-15 reps',
                'Dragon Flags: 4 sets x 8-10 reps',
                'L-Sit Hold: 4 sets x 20 seconds',
                'Stretching: 10 minutes'
              ]
            }
          ]
        }
      }
    },
    advanced: {
      strength: {
        '6': {
          title: 'Advanced 6-Day Split (PPL)',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Push (Chest/Shoulders/Triceps)',
              exercises: [
                'Bench Press: 5 sets x 5 reps',
                'Overhead Press: 5 sets x 5 reps'
              ]
            },
            {
              name: 'Day 2 - Pull (Back/Biceps)',
              exercises: [
                'Deadlifts: 5 sets x 5 reps',
                'Pull-ups: 5 sets x 8-10 reps',
                'Barbell Rows: 4 sets x 8-10 reps',
                'Face Pulls: 4 sets x 12-15 reps',
                'Barbell Curls: 4 sets x 10-12 reps'
              ]
            },
            {
              name: 'Day 3 - Legs',
              exercises: [
                'Squats: 5 sets x 5 reps',
                'Romanian Deadlifts: 4 sets x 8-10 reps',
                'Leg Press: 4 sets x 10-12 reps',
                'Leg Curls: 4 sets x 12-15 reps',
                'Calf Raises: 4 sets x 15-20 reps'
              ]
            },
            {
              name: 'Day 4 - Push (Chest/Shoulders/Triceps)',
              exercises: [
                'Incline Bench Press: 5 sets x 5 reps',
                'Dumbbell Shoulder Press: 4 sets x 8-10 reps',
                'Chest Flyes: 4 sets x 12-15 reps',
                'Lateral Raises: 4 sets x 12-15 reps',
                'Overhead Tricep Extensions: 4 sets x 12-15 reps'
              ]
            },
            {
              name: 'Day 5 - Pull (Back/Biceps)',
              exercises: [
                'Barbell Rows: 5 sets x 5 reps',
                'Lat Pulldowns: 4 sets x 8-10 reps',
                'One-Arm Dumbbell Rows: 4 sets x 10-12 reps',
                'Face Pulls: 4 sets x 12-15 reps',
                'Hammer Curls: 4 sets x 12-15 reps'
              ]
            },
            {
              name: 'Day 6 - Legs',
              exercises: [
                'Front Squats: 5 sets x 5 reps',
                'Leg Press: 4 sets x 10-12 reps',
                'Leg Extensions: 4 sets x 12-15 reps',
                'Leg Curls: 4 sets x 12-15 reps',
                'Calf Raises: 4 sets x 15-20 reps'
              ]
            }
          ]
        }
      },
      hypertrophy: {
        '6': {
          title: 'Advanced Hypertrophy 6-Day Split (PPL)',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Push (Chest/Shoulders/Triceps)',
              exercises: [
                'Bench Press: 4 sets x 8-12 reps',
                'Incline Dumbbell Press: 4 sets x 10-12 reps',
                'Chest Flyes: 3 sets x 12-15 reps',
                'Lateral Raises: 3 sets x 12-15 reps',
                'Tricep Pushdowns: 3 sets x 12-15 reps'
              ]
            },
            {
              name: 'Day 2 - Pull (Back/Biceps)',
              exercises: [
                'Deadlifts: 4 sets x 8-10 reps',
                'Pull-ups: 4 sets x 8-10 reps',
                'Barbell Rows: 3 sets x 10-12 reps',
                'Face Pulls: 3 sets x 12-15 reps',
                'Barbell Curls: 3 sets x 12-15 reps'
              ]
            },
            {
              name: 'Day 3 - Legs',
              exercises: [
                'Squats: 4 sets x 8-12 reps',
                'Romanian Deadlifts: 4 sets x 10-12 reps',
                'Leg Press: 3 sets x 12-15 reps',
                'Leg Curls: 3 sets x 12-15 reps',
                'Calf Raises: 4 sets x 15-20 reps'
              ]
            },
            {
              name: 'Day 4 - Push (Chest/Shoulders/Triceps)',
              exercises: [
                'Incline Bench Press: 4 sets x 8-12 reps',
                'Dumbbell Shoulder Press: 4 sets x 10-12 reps',
                'Chest Flyes: 3 sets x 12-15 reps',
                'Lateral Raises: 3 sets x 12-15 reps',
                'Overhead Tricep Extensions: 3 sets x 12-15 reps'
              ]
            },
            {
              name: 'Day 5 - Pull (Back/Biceps)',
              exercises: [
                'Barbell Rows: 4 sets x 8-10 reps',
                'Lat Pulldowns: 4 sets x 10-12 reps',
                'One-Arm Dumbbell Rows: 3 sets x 10-12 reps',
                'Face Pulls: 3 sets x 12-15 reps',
                'Hammer Curls: 3 sets x 12-15 reps'
              ]
            },
            {
              name: 'Day 6 - Legs',
              exercises: [
                'Front Squats: 4 sets x 8-12 reps',
                'Leg Press: 4 sets x 12-15 reps',
                'Leg Extensions: 3 sets x 12-15 reps',
                'Leg Curls: 3 sets x 12-15 reps',
                'Calf Raises: 4 sets x 15-20 reps'
              ]
            }
          ]
        }
      },
      endurance: {
        '4': {
          title: 'Advanced Endurance 4-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Cardio & Core',
              exercises: [
                'Running: 40-50 minutes',
                'Cycling: 40-50 minutes',
                'Plank: 4 sets x 60 seconds',
                'Mountain Climbers: 4 sets x 40 reps',
                'Russian Twists: 4 sets x 30 reps'
              ]
            },
            {
              name: 'Day 2 - Full Body Circuit',
              exercises: [
                'Jump Squats: 4 sets x 25 reps',
                'Burpees: 4 sets x 20 reps',
                'Push-ups: 4 sets x 20 reps',
                'Lunges: 4 sets x 20 reps per leg',
                'Bicycle Crunches: 4 sets x 30 reps'
              ]
            },
            {
              name: 'Day 3 - Interval Training',
              exercises: [
                'Sprints: 40 seconds (repeat 12 times)',
                'Rest: 1 minute between sprints'
              ]
            },
            {
              name: 'Day 4 - Long-Distance Cardio',
              exercises: [
                'Running: 60-90 minutes',
                'Cycling: 60-90 minutes'
              ]
            }
          ]
        }
      },
      functional: {
        '4': {
          title: 'Advanced Functional 4-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Full Body Functional',
              exercises: [
                'Kettlebell Swings: 5 sets x 25 reps',
                'Box Jumps: 5 sets x 15 reps',
                'Medicine Ball Slams: 5 sets x 20 reps',
                'Battle Ropes: 5 sets x 60 seconds',
                'Farmer’s Walk: 5 sets x 40 meters'
              ]
            },
            {
              name: 'Day 2 - Core & Stability',
              exercises: [
                'Plank: 5 sets x 60 seconds',
                'Side Plank: 5 sets x 45 seconds per side',
                'Russian Twists: 5 sets x 30 reps',
                'Bird Dogs: 5 sets x 20 reps per side',
                'Dead Bug: 5 sets x 20 reps'
              ]
            },
            {
              name: 'Day 3 - Agility & Speed',
              exercises: [
                'Ladder Drills: 5 sets x 45 seconds',
                'Cone Drills: 5 sets x 45 seconds',
                'Shuttle Runs: 5 sets x 30 meters'
              ]
            },
            {
              name: 'Day 4 - Power & Explosiveness',
              exercises: [
                'Clean and Press: 5 sets x 8-10 reps',
                'Snatch: 5 sets x 8-10 reps',
                'Jump Squats: 5 sets x 15 reps',
                'Box Jumps: 5 sets x 12 reps'
              ]
            }
          ]
        }
      },
      hiit: {
        '4': {
          title: 'Advanced HIIT 4-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Cardio HIIT',
              exercises: [
                'Jump Squats: 50 seconds',
                'Burpees: 50 seconds',
                'Mountain Climbers: 50 seconds',
                'High Knees: 50 seconds',
                'Rest: 1 minute (repeat 5 rounds)'
              ]
            },
            {
              name: 'Day 2 - Strength HIIT',
              exercises: [
                'Push-ups: 50 seconds',
                'Lunges: 50 seconds',
                'Plank Shoulder Taps: 50 seconds',
                'Bicycle Crunches: 50 seconds',
                'Rest: 1 minute (repeat 5 rounds)'
              ]
            },
            {
              name: 'Day 3 - Tabata',
              exercises: [
                '20 seconds work, 10 seconds rest (repeat 8 rounds)',
                'Exercises: Jump Squats, Burpees, Mountain Climbers, High Knees'
              ]
            },
            {
              name: 'Day 4 - EMOM (Every Minute on the Minute)',
              exercises: [
                'Minute 1: 10 Burpees',
                'Minute 2: 15 Push-ups',
                'Minute 3: 20 Squats',
                'Repeat for 20 minutes'
              ]
            }
          ]
        }
      },
      calisthenics: {
        '4': {
          title: 'Advanced Calisthenics 4-Day Split',
          frequency: 'Each workout twice per week',
          days: [
            {
              name: 'Day 1 - Upper Body',
              exercises: [
                'Push-ups: 5 sets x 15-20 reps',
                'Pull-ups: 5 sets x 10-12 reps',
                'Dips: 5 sets x 12-15 reps',
                'Plank: 5 sets x 60 seconds'
              ]
            },
            {
              name: 'Day 2 - Lower Body',
              exercises: [
                'Bodyweight Squats: 5 sets x 20-25 reps',
                'Lunges: 5 sets x 15 reps per leg',
                'Step-ups: 5 sets x 20 reps per leg',
                'Calf Raises: 5 sets x 25-30 reps'
              ]
            },
            {
              name: 'Day 3 - Core & Flexibility',
              exercises: [
                'Hanging Leg Raises: 5 sets x 15-20 reps',
                'Dragon Flags: 5 sets x 10-12 reps',
                'L-Sit Hold: 5 sets x 30 seconds',
                'Stretching: 15 minutes'
              ]
            },
            {
              name: 'Day 4 - Skill Work',
              exercises: [
                'Handstand Practice: 10 minutes',
                'Muscle-up Practice: 10 minutes',
                'Front Lever Practice: 10 minutes',
                'Planche Practice: 10 minutes'
              ]
            }
          ]
        }
      }
    }
  };

  const getRecommendation = () => {
    // Convert difficulty level and workout type to lowercase for object keys
    const difficulty = difficultyLevel.toLowerCase();
    const workout = workoutType.toLowerCase();
  
    // Check if the difficulty level exists
    if (!workoutPlans[difficulty]) {
      console.log('Difficulty level not found:', difficulty);
    }
  
    // Check if the workout type exists within the difficulty level
    if (workoutPlans[difficulty] && !workoutPlans[difficulty][workout]) {
      console.log('Workout type not found for difficulty level:', workout);
    }
  
    // Check if the split exists within the workout type and difficulty level
    if (workoutPlans[difficulty] && workoutPlans[difficulty][workout] && !workoutPlans[difficulty][workout][split]) {
      console.log('Split not found for workout type and difficulty level:', split);
    }
  
    // If we have a plan that matches the user's criteria
    if (
      workoutPlans[difficulty] && 
      workoutPlans[difficulty][workout] && 
      workoutPlans[difficulty][workout][split]
    ) {
      setRecommendation(workoutPlans[difficulty][workout][split]);
      setError('');
    } else {
      // If no exact match, return a generic response
      console.log('No exact match found');
      setRecommendation({
        title: 'Custom Workout Plan',
        message: `We don't have an exact match for a ${difficultyLevel} ${workoutType} ${split}-day split in our database yet. Please contact our fitness coach for a personalized plan.`
      });
      setError('No exact match found. Showing a generic recommendation.');
    }
  
    setShowRecommendation(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (difficultyLevel && workoutType && split) {
      getRecommendation();
    } else {
      setError('Please select all options to get a recommendation.');
    }
  };

  const handleReset = () => {
    setDifficultyLevel('');
    setWorkoutType('');
    setSplit('');
    setShowRecommendation(false);
    setRecommendation(null);
    setError('');
  };

  return (
    <div className='main-rec'>
      <Sidebar />
      <div className="recommended-workout">
        <h1 className="recommended-title">Recommended Workout Plans</h1>
        <p className="recommended-subtitle">
          Find the perfect workout plan based on your preferences and fitness level
        </p>

        {error && <p className="error-message">{error}</p>}

        {!showRecommendation ? (
          <form className="workout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Difficulty Level</label>
              <select 
                value={difficultyLevel} 
                onChange={(e) => setDifficultyLevel(e.target.value)} 
                required
              >
                <option value="">Select Difficulty</option>
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Workout Type</label>
              <select 
                value={workoutType} 
                onChange={(e) => setWorkoutType(e.target.value)} 
                required
              >
                <option value="">Select Type</option>
                {workoutTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Workout Split</label>
              <select 
                value={split} 
                onChange={(e) => setSplit(e.target.value)} 
                required
              >
                <option value="">Select Split</option>
                {splitOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="recommend-button">Get Recommendations</button>
          </form>
        ) : (
          <div className="recommendation-results">
            {recommendation.message ? (
              <div className="generic-recommendation">
                <h2>{recommendation.title}</h2>
                <p>{recommendation.message}</p>
              </div>
            ) : (
              <div className="specific-recommendation">
                <h2>{recommendation.title}</h2>
                <p className="recommendation-frequency"><strong>Frequency:</strong> {recommendation.frequency}</p>
                
                {recommendation.exercises && (
                  <div className="workout-details">
                    <h3>Workout Plan</h3>
                    <ul className="exercise-list">
                      {recommendation.exercises.map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {recommendation.days && (
                  <div className="split-details">
                    {recommendation.days.map((day, index) => (
                      <div key={index} className="day-plan">
                        <h3>{day.name}</h3>
                        <ul className="exercise-list">
                          {day.exercises.map((exercise, exIndex) => (
                            <li key={exIndex}>{exercise}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <div className="recommendation-tips">
                  <h3>Tips</h3>
                  <ul>
                    <li>Warm up properly before each workout (5-10 minutes of light cardio)</li>
                    <li>Rest 1-2 minutes between sets</li>
                    <li>Stay hydrated throughout your workout</li>
                    <li>Focus on proper form rather than lifting heavier weights</li>
                  </ul>
                </div>
              </div>
            )}
            
            <button onClick={handleReset} className="reset-button">
              Find Another Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedWorkout;