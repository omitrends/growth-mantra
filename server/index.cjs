const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Database connection setup
const connection = require('./databases.cjs');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';  // Set your JWT secret key here

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
    const token = jwt.sign({ userId: user.UserId }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token, // Return the token
    });
  });
});

// Setup route without token authentication
// Removed authenticateToken middleware for /setup route
app.post('/setup', (req, res) => {
  console.log("Received data at /setup endpoint:", req.body); // Log incoming request data

  let { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender } = req.body;

  if (!name || !phoneno || !age || !height || !weight || !lifestyle || !fitnessgoal || !gender) {
    console.log("Missing required fields:", { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender });
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  height = parseFloat(height);  // Ensure height is a number
  weight = parseFloat(weight);  // Ensure weight is a number

  if (isNaN(height) || isNaN(weight)) {
    console.log("Invalid height or weight:", { height, weight });
    return res.status(400).json({ success: false, message: 'Height and weight must be valid numbers' });
  }

  // Log the data we are going to insert
  console.log("Data ready for insertion:", { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender });

  // Prepare the query for inserting data
  const insertQuery = `
    INSERT INTO Setup (Name, PhoneNo, Age, Height, Weight, LifeStyle, FitnessGoal, Gender)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Insert the data into the Setup table
  connection.query(insertQuery, [name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender], (err, result) => {
    if (err) {
      console.error('Database Insertion Error:', err.sqlMessage);
      return res.status(500).json({ success: false, message: 'Error inserting setup data' });
    }

    console.log('Setup data inserted successfully');
    return res.status(200).json({ success: true, message: 'Setup completed successfully!' });
  });
});


app.post('/workout', (req,res) =>{
  const {userId} =req.body;
  if(!userId){
    return res.status(400).json({sucess :false, message: "Missing required fields"});
  }

  const insertQuery = `insert into workout (userId) values (?)`;
  connection.query(insertQuery, [userId], (err, result) =>{
    if (err) return res.status(500).json({ success: false, message: 'Error adding workout' });
    res.status(200).json({ 
      success: true, 
      message: 'Workout added successfully', 
      workoutId: result.insertId 
    });
  });  
});

app.post('/exercises', (req, res) => {
  const { workoutId, type, exerciseName, duration, intensity, distance, calories, weight, reps } = req.body;

  if (!workoutId || !type || !exerciseName) {
    return res.status(400).json({ success: false, message: 'WorkoutId, Type, and ExerciseName are required' });
  }

  const insertQuery = `
    INSERT INTO Exercises (WorkoutId, Type, ExerciseName, Duration, Intensity, Distance, Calories, Weight, Reps) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(insertQuery, [workoutId, type, exerciseName, duration, intensity, distance, calories, weight, reps], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Error adding exercise' });

    res.status(200).json({ 
      success: true, 
      message: 'Exercise added successfully', 
      exerciseId: result.insertId 
    });
  });
});

app.get('/workout/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM Workouts WHERE UserId = ?';

  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error fetching workouts' });

    res.status(200).json({ success: true, workouts: results });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
