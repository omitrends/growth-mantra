const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'growthmantra',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Database Connected');
  createTables();
});

function createTables() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS Register (
      UserId INT AUTO_INCREMENT PRIMARY KEY,
      UserEmail VARCHAR(100) NOT NULL,
      Password VARCHAR(100) UNIQUE NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS Login (
      LoginId INT AUTO_INCREMENT PRIMARY KEY,
      UserId INT,
      FOREIGN KEY (UserId) REFERENCES Register(UserId)
    );`,
  ];

  executeQueries(tables);
}

function executeQueries(queries) {
  if (queries.length === 0) {
    console.log("All tables created successfully.");
    connection.end();
    return;
  }

  const sql = queries.shift();
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log("Table created successfully.");

    executeQueries(queries);
  });
}

//register api
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // SQL query to insert a new user into the Register table
  const registerQuery = 'INSERT INTO Register (UserEmail, Password) VALUES (?, ?)';

  connection.query(registerQuery, [email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error registering user: ', err);
      return res.status(500).json({ message: 'Error registering user' });
    }

    // Insert the user into the Login table (create an association)
    const userId = result.insertId;
    const loginQuery = 'INSERT INTO Login (UserId) VALUES (?)';

    connection.query(loginQuery, [userId], (err) => {
      if (err) {
        console.error('Error linking user to login: ', err);
        return res.status(500).json({ message: 'Error creating login entry' });
      }

      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // SQL query to find the user in the Register table
  const loginQuery = 'SELECT * FROM Register WHERE UserEmail = ?';

  connection.query(loginQuery, [email], async (err, results) => {
    if (err) {
      console.error('Error finding user: ', err);
      return res.status(500).json({ message: 'Error finding user' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    // Compare the password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});