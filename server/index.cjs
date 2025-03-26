const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

const app = express();
const port = 5000;
// Database connection setup
const connection = require('./databases.cjs');
const { fstat } = require('fs');
const Papa = require('papaparse');
const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';  // Set your JWT secret key here

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    }

    req.user = user;
    next();
  });
};

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
  }

  const checkEmailQuery = 'SELECT * FROM Register WHERE UserEmail = ?';
  connection.query(checkEmailQuery, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO Register (Username, UserEmail, Password) VALUES (?, ?, ?)';
    connection.query(insertQuery, [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error registering user' });
      }

      // Retrieve the newly registered user's ID
      const getUserQuery = 'SELECT * FROM Register WHERE UserEmail = ?';
      connection.query(getUserQuery, [email], (err, userResult) => {
        if (err || userResult.length === 0) {
          return res.status(500).json({ success: false, message: 'Error retrieving user data' });
        }

        const user = userResult[0];
        const userId = user.UserId;

        // Generate a JWT token for the user
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

        // Send token along with success response
        res.status(200).json({
          success: true,
          message: 'User registered successfully',
          token: token,  // Send token in response
          userId: userId  // Send userId (optional)
        });
      });
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM Register WHERE UserEmail = ?';
  connection.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.UserId, email: user.UserEmail }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token, // Return the token
    });
  });
});


app.post('/setup', (req, res) => {
  console.log("Received data at /setup endpoint:", req.body); // Log incoming request data

  let { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender, UserEmail } = req.body;

  if (!name || !phoneno || !age || !height || !weight || !lifestyle || !fitnessgoal || !gender || !UserEmail) {
    console.log("Missing required fields:", { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender, UserEmail });
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  height = parseFloat(height);  // Ensure height is a number
  weight = parseFloat(weight);  // Ensure weight is a number

  if (isNaN(height) || isNaN(weight)) {
    console.log("Invalid height or weight:", { height, weight });
    return res.status(400).json({ success: false, message: 'Height and weight must be valid numbers' });
  }

  // Fetch the UserId based on the email
  const getUserQuery = "SELECT UserId FROM Register WHERE UserEmail = ?";
  connection.query(getUserQuery, [UserEmail], (err, results) => {
    if (err || results.length === 0) {
      console.error("Error fetching UserId:", err || "User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = results[0].UserId;

    // Log the data we are going to insert
    console.log("Data ready for insertion:", { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender, userId });

    // Prepare the query for inserting data
    const insertQuery = `
      INSERT INTO Setup (UserId, Name, PhoneNo, Age, Height, Weight, LifeStyle, FitnessGoal, Gender)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert the data into the Setup table
    connection.query(insertQuery, [userId, name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender], (err, result) => {
      if (err) {
        console.error('Database Insertion Error:', err.sqlMessage);
        return res.status(500).json({ success: false, message: 'Error inserting setup data' });
      }

      console.log('Setup data inserted successfully');
      return res.status(200).json({ success: true, message: 'Setup completed successfully!' });
    });
  });
});

app.get('/userdata', (req, res) => {
  const { UserEmail } = req.query;

  if (!UserEmail) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Fetch the UserId based on the email
  const getUserQuery = "SELECT UserId FROM Register WHERE UserEmail = ?";
  connection.query(getUserQuery, [UserEmail], (err, results) => {
    if (err || results.length === 0) {
      console.error("Error fetching UserId:", err || "User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = results[0].UserId;

    // Fetch the setup data based on UserId
    const getSetupQuery = "SELECT * FROM Setup WHERE UserId = ?";
    connection.query(getSetupQuery, [userId], (err, setupData) => {
      if (err) {
        console.error("Error fetching setup data:", err);
        return res.status(500).json({ success: false, message: "Error fetching setup data" });
      }

      if (setupData.length === 0) {
        return res.status(404).json({ success: false, message: "No setup data found" });
      }

      // Send the setup data back
      res.json({ success: true, setupData: setupData[0] });
    });
  });
});

app.post('/logWorkout', (req, res) => { 

  const { UserEmail, workoutType, bodyPart, sets } = req.body;

  if (!UserEmail || !workoutType || !bodyPart || !sets || sets.length === 0) {
    console.log("Missing required fields:", { UserEmail, workoutType, bodyPart, sets });
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const getUserQuery = "SELECT UserId FROM Register WHERE UserEmail = ?";
  connection.query(getUserQuery, [UserEmail], (err, results) => {
    if (err || results.length === 0) {
      console.error("Error fetching UserId:", err || "User not found");
      return res.status(500).json({ success: false, message: "User not found" });
    }

    const userId = results[0].UserId;

    const insertWorkoutQuery = "INSERT INTO Workout (UserId, WorkoutType, BodyPart) VALUES (?, ?, ?)";
    connection.query(insertWorkoutQuery, [userId, workoutType, bodyPart], (err, result) => {
      if (err) {
        console.error("Database Insertion Error (Workout):", err.sqlMessage);
        return res.status(500).json({ success: false, message: "Error logging workout" });
      }

      const workoutId = result.insertId;
      const insertExercisesQuery = "INSERT INTO Exercises (WorkoutId, Exercise, Weight, Reps, Duration, Distance, Calories, Intensity) VALUES ?";
      const exercisesValues = sets.map(set => [workoutId, set.exercise, set.weight, set.reps, set.duration, set.distance, set.calories, set.intensity]);

      connection.query(insertExercisesQuery, [exercisesValues], (err) => {
        if (err) {
          console.error("Database Insertion Error (Exercises):", err.sqlMessage);
          return res.status(500).json({ success: false, message: "Error logging exercises" });
        }

        console.log("Workout logged successfully!");
        return res.status(200).json({ success: true, message: "Workout logged successfully!" });
      });
    });
  });
});

app.get('/getWorkouts', (req, res) => {
  console.log("Received workout data:", req.body);

  const { UserEmail } = req.query;

  if (!UserEmail) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Fetch the UserId based on the email
  const getUserQuery = "SELECT UserId FROM Register WHERE UserEmail = ?";
  connection.query(getUserQuery, [UserEmail], (err, results) => {
    if (err || results.length === 0) {
      console.error("Error fetching UserId:", err || "User not found");
      return res.status(500).json({ success: false, message: "User not found" });
    }

    const userId = results[0].UserId;

    // Fetch the workouts based on UserId
    const getWorkoutsQuery = "SELECT * FROM Workout WHERE UserId = ?";
    connection.query(getWorkoutsQuery, [userId], (err, workouts) => {
      if (err) {
        console.error("Error fetching workouts:", err);
        return res.status(500).json({ success: false, message: "Error fetching workouts" });
      }

      if (workouts.length === 0) {
        return res.status(404).json({ success: false, message: "No workouts found" });
      }

      // Fetch exercises for each workout
      const workoutIds = workouts.map(workout => workout.WorkoutId);
      const getExercisesQuery = "SELECT * FROM Exercises WHERE WorkoutId IN (?)";
      connection.query(getExercisesQuery, [workoutIds], (err, exercises) => {
        if (err) {
          console.error("Error fetching exercises:", err);
          return res.status(500).json({ success: false, message: "Error fetching exercises" });
        }

        // Map exercises to their respective workouts
        const workoutsWithExercises = workouts.map(workout => {
          const workoutExercises = exercises.filter(exercise => exercise.WorkoutId === workout.WorkoutId);
          return {
            ...workout,
            sets: workoutExercises
          };
        });

        // Send the workouts with exercises back
        res.json({ success: true, workouts: workoutsWithExercises });
      });
    });
  });
});

// Log food entry
app.post('/log-meal', (req, res) => {
  const { UserId, meal_type, category, items } = req.body;

  if (!UserId || !meal_type || !category || !items || items.length === 0) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Validate category length
  if (category.length > 50) {
    return res.status(400).json({ error: 'Category value is too long' });
  }

  const foodData = items.map(item => [
    UserId,
    meal_type,
    category,
    item.food_name,
    item.quantity,
    item.calories,
    new Date(), // FoodDate
  ]);

  const insertFoodQuery = `
    INSERT INTO food (UserId, meal_type, category, food_name, quantity, calories, FoodDate)
    VALUES ?
  `;

  connection.query(insertFoodQuery, [foodData], (err) => {
    if (err) {
      console.error("Error inserting food data:", err);
      return res.status(500).json({ error: 'Error inserting food data' });
    }

    res.json({ message: 'Meal and food items logged successfully!' });
  });
});

// Get food items
app.get('/logged-meals/:UserId', (req, res) => {
  const { UserId } = req.params;

  if (!UserId) {
    return res.status(400).json({ success: false, message: 'UserId is required' });
  }

  const query = `
    SELECT meal_type, category, food_name, quantity, calories, FoodDate
    FROM food
    WHERE UserId = ?
    ORDER BY FoodDate DESC
  `;

  connection.query(query, [UserId], (err, results) => {
    if (err) {
      console.error("Error fetching logged meals:", err);
      return res.status(500).json({ success: false, message: 'Error fetching logged meals' });
    }

    res.status(200).json({ success: true, meals: results });
  });
});

// Search food
app.get('/search-food', (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    return res.json([]);
  }

  const query = 'SELECT food_name, calories_per_unit FROM fooditems WHERE food_name LIKE ? LIMIT 10';
  connection.query(query, [`%${searchQuery}%`], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Get user ID by email
app.get("/get-user-id", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const query = "SELECT UserId FROM Register WHERE UserEmail = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, UserId: results[0].UserId });
  });
});

app.get('/logged-meals/:UserId', (req, res) => {
  const { UserId } = req.params;

  if (!UserId) {
    return res.status(400).json({ success: false, message: 'UserId is required' });
  }

  const query = `
    SELECT f.meal_type, f.category, fi.food_name, fi.calories_per_unit, fi.FoodId
    FROM food f
    JOIN fooditems fi ON f.FoodId = fi.FoodId
    WHERE f.UserId = ?
  `;

  connection.query(query, [UserId], (err, results) => {
    if (err) {
      console.error("Error fetching logged meals:", err);
      return res.status(500).json({ success: false, message: 'Error fetching logged meals' });
    }

    res.status(200).json({ success: true, meals: results });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
