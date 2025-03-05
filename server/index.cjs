const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connection = require('./databases.cjs'); // Assuming your MySQL connection is here

const app = express();
const port = 5000;

// CORS setup to allow frontend to access backend (adjust the URL if needed)
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL (adjust if different)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Middleware setup
app.use(bodyParser.json()); // Parsing JSON requests

// Registration Route (POST method)
app.post('/register', async (req, res) => {
    const { username, email, password, dateOfBirth } = req.body;

    if (!username || !email || !password || !dateOfBirth) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const emailCheckQuery = 'SELECT * FROM Register WHERE UserEmail = ?';
        connection.query(emailCheckQuery, [email], async (err, result) => {
            if (err) {
                console.error('Error checking email:', err.message);
                return res.status(500).json({ message: 'Error checking email' });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const registerQuery = `INSERT INTO Register (Username, UserEmail, DateOfBirth, Password) VALUES (?, ?, ?, ?)`;

            connection.query(registerQuery, [username, email, dateOfBirth, hashedPassword], (err) => {
                if (err) {
                    console.error('Error registering user:', err.message);
                    return res.status(500).json({ message: 'Error registering user' });
                }
                console.log('User registered successfully');
                return res.status(200).json({ message: 'User registered successfully' });
            });
        });
    } catch (err) {
        console.error('Error during registration:', err.message);
        return res.status(500).json({ message: 'Error during registration' });
    }
});

// Login Route (POST method)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation to ensure email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Query to find the user by email
        const loginQuery = 'SELECT * FROM Register WHERE UserEmail = ?';

        connection.query(loginQuery, [email], async (err, result) => {
            if (err) {
                console.error('Error fetching user:', err.message);
                return res.status(500).json({ message: 'Error fetching user' });
            }

            if (result.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }

            const user = result[0];

            // Compare the entered password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.Password);

            if (passwordMatch) {
                return res.status(200).json({ message: 'Login successful', userId: user.UserId });
            } else {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        return res.status(500).json({ message: 'Error during login' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
