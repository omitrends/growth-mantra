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

const createSetupTable = `
  CREATE TABLE IF NOT EXISTS Setup ( SetupId int  AUTO_INCREMENT primary key,
    Name CHAR(30),
    PhoneNo INT,
    Age INT,
    Height INT,
    Weight INT,
    BMI DECIMAL(5,2) AS (Weight / (Height * Height)*10000) STORED,
    LifeStyle ENUM('Active', 'Moderate', 'Sedentary'),
    FitnessGoal ENUM('Muscle Gain', 'Fat Loss'),
    Gender ENUM('Male', 'Female', 'Other'),
    UserId INT,
    FOREIGN KEY (UserId) REFERENCES Register(UserId)
  );
`;

const query = `
SELECT s.*, r.UserEmail, r.Username FROM Setup AS s INNER JOIN register as r ON (s.UserId=r.UserId);
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

connection.query(createSetupTable, (err, result) => {
  if (err) {
    console.error('Error creating Setup table:', err.message);
    return;
  }
  console.log('Setup table created successfully');
});

connection.execute(query, (err, result) => {
  if (err) {
    console.error('error executing query' , err.message );
    return;
  }
  console.log(result);
});
module.exports = connection; // Export the connection to use in other files
