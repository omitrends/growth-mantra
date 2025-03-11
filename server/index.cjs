const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('./databases.cjs'); 
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json()); 

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

            connection.query(registerQuery, [username, email, hashedPassword], (err, result) => {
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
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

            const passwordMatch = await bcrypt.compare(password, user.Password);

            if (passwordMatch) {
                return res.status(200).json({ message: 'Login successful' });
            } else {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        });
    } catch (err) {
        console.error('Error during login:', err.message);
        return res.status(500).json({ message: 'Error during login' });
    }
});

app.post('/setup', async (req, res) => {
    // Log the request body to see what data is being received
    console.log('Request Body:', req.body);

    const { name, phoneNo, age, height, weight, lifestyle, fitnessgoal, gender, email } = req.body;

    if (!name || !phoneNo || !age || !height || !weight || !lifestyle || !fitnessgoal || !gender || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Use email to fetch the UserId (since we no longer have JWT to get user info)
    const getUserIdQuery = 'SELECT UserId FROM Register WHERE UserEmail = ?';

    connection.query(getUserIdQuery, [email], (err, result) => {
        if (err) {
            console.error('Error fetching UserId:', err.message);
            return res.status(500).json({ message: 'Error fetching UserId' });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const userId = result[0].UserId;

        const insertQuery = `
            INSERT INTO Setup (Name, PhoneNo, Age, Height, Weight, LifeStyle, FitnessGoal, Gender, UserId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(
            insertQuery,
            [name, phoneNo, age, height, weight, lifestyle, fitnessgoal, gender, userId],
            (err, result) => {
                if (err) {
                    console.error('Error inserting setup data:', err.message);
                    return res.status(500).json({ message: 'Error saving setup data', error: err.message });
                }

                return res.status(200).json({ message: 'Setup data saved successfully' });
            }
        );
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
