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
const JWT_SECRET = 'your_jwt_secret_key';

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
  }

  const checkEmailQuery = 'SELECT * FROM Register WHERE UserEmail = ?';
  connection.query(checkEmailQuery, [email], async (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Server error' });

    if (result.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = 'INSERT INTO Register (Username, UserEmail, Password) VALUES (?, ?, ?)';
    connection.query(insertQuery, [username, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Error registering user' });

      const getUserQuery = 'SELECT * FROM Register WHERE UserEmail = ?';
      connection.query(getUserQuery, [email], (err, userResult) => {
        if (err || userResult.length === 0) {
          return res.status(500).json({ success: false, message: 'Error retrieving user data' });
        }

        const user = userResult[0];
        const token = jwt.sign({ UserId: user.UserId }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
          success: true,
          message: 'User registered successfully',
          token,
          UserId: user.UserId
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
    if (err) return res.status(500).json({ success: false, message: 'Server error' });

    if (result.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ UserId: user.UserId }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, message: 'Login successful', token });
  });
});

// Setup route
app.post('/setup', (req, res) => {
  const { name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender } = req.body;
  if (!name || !phoneno || !age || !height || !weight || !lifestyle || !fitnessgoal || !gender) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const insertQuery = 'INSERT INTO Setup (Name, PhoneNo, Age, Height, Weight, LifeStyle, FitnessGoal, Gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(insertQuery, [name, phoneno, age, height, weight, lifestyle, fitnessgoal, gender], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Error inserting setup data' });
    res.status(200).json({ success: true, message: 'Setup completed successfully!' });
  });
});

// Add workout
app.post('/workout', (req, res) => {
  const { UserId } = req.body;

  if (!UserId) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const insertQuery = 'INSERT INTO Workout (UserId) VALUES (?)';
  connection.query(insertQuery, [UserId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Error adding workout' });
    res.status(200).json({ success: true, message: 'Workout added successfully', workoutId: result.insertId });
  });
});

// Get workouts
app.get('/workout/:UserId', (req, res) => {
  const { UserId } = req.params;
  const query = 'SELECT * FROM Workouts WHERE UserId = ?';

  connection.query(query, [UserId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Error fetching workouts' });
    res.status(200).json({ success: true, workouts: results });
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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
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