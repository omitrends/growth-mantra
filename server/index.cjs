const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('./databases.cjs');

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

// Secret key for JWT (store securely in environment variables in production)
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']; // Get the token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    // Remove the "Bearer " part if it's included in the token (optional)
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user; // Attach the decoded user info to the request object
        next(); // Call next to proceed to the route handler
    });
};

// Registration Route (POST method)
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
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
            const registerQuery = `INSERT INTO Register (Username, UserEmail, Password) VALUES (?, ?, ?)`;

            // Insert the user data into the database
            connection.query(registerQuery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error registering user:', err.message);
                    return res.status(500).json({ message: 'Error registering user' });
                }

                // Create JWT token after successful registration
                const jwtToken = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1h' });

                console.log('User registered successfully');
                return res.status(200).json({ message: 'User registered successfully', token: jwtToken });
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
                // Create JWT token after successful login
                const jwtToken = jwt.sign({ username: user.Username, email: user.UserEmail, dateOfBirth: user.DateOfBirth }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ message: 'Login successful', token: jwtToken });
            } else {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        return res.status(500).json({ message: 'Error during login' });
    }
});

// Protect the dashboard route with JWT authentication middleware
app.get('/dashboard', authenticateJWT, (req, res) => {
    // Only authenticated users will reach this point
    res.status(200).json({ message: 'Welcome to the dashboard', user: req.user });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
