// databases.cjs
const mysql = require('mysql2');

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost', // Database host (usually 'localhost' for local setup)
  user: 'root', // Database username
  password: 'amruta123', // Database password (modify as per your setup)
  database: 'growthmantra', // Name of your database
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('MySQL Connected');
});

// SQL queries to create tables (if they don't already exist)
const createRegisterTable = `
  CREATE TABLE IF NOT EXISTS Register (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    UserEmail VARCHAR(100) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    Password VARCHAR(255) NOT NULL
  );
`;

const createLoginTable = `
  CREATE TABLE IF NOT EXISTS Login (
    LoginId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT,
    FOREIGN KEY (UserId) REFERENCES Register(UserId) ON DELETE CASCADE
  );
`;

// Execute table creation queries
connection.query(createRegisterTable, (err, result) => {
  if (err) {
    console.error('Error creating Register table:', err.message);
    return;
  }
  console.log('Register table created successfully');
});

connection.query(createLoginTable, (err, result) => {
  if (err) {
    console.error('Error creating Login table:', err.message);
    return;
  }
  console.log('Login table created successfully');
});

module.exports = connection; // Export the connection to use in other files
