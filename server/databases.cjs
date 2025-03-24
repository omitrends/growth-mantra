const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',            
  user: 'root',                 
  password: 'root',   
  database: 'growthmantra',    
});

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
  CREATE TABLE IF NOT EXISTS Setup (
  SetupId INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(30),
  PhoneNo VARCHAR(20),
  Age INT,
  Height INT NOT NULL,
  Weight INT NOT NULL,
  BMI DECIMAL(5,2) GENERATED ALWAYS AS (Weight / ((Height / 100) * (Height / 100))) STORED,
  LifeStyle ENUM('Active', 'Moderate', 'Sedentary'),
  FitnessGoal ENUM('Muscle Gain', 'Fat Loss'),
  Gender ENUM('Male', 'Female', 'Other'),
  UserId INT,
  FOREIGN KEY (UserId) REFERENCES Register(UserId)
);
`;

const createWorkoutTable = `
  CREATE TABLE IF NOT EXISTS Workout (
    WorkoutId INT AUTO_Increment primary key,
    userId int,
    WorkoutDate date not null default (curdate()),
    foreign key (userId) references register(userId)
    );
`;

const createexercisesTable = `
  create table if not exists exercises(
    exerciseId int auto_increment primary key,
    WorkoutId int not null,
    exerciseType enum('Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'functional') not null,
    exerciseName varchar(255) not null,
    Duration INT DEFAULT NULL,
    Intensity VARCHAR(50) DEFAULT NULL,
    Distance FLOAT DEFAULT NULL,
    Calories INT DEFAULT NULL,
    Weight FLOAT DEFAULT NULL,
    Reps INT DEFAULT NULL,
    FOREIGN KEY (WorkoutId) REFERENCES Workout(WorkoutId)
  );
`;


function initializeDatabase() {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      return;
    }
    console.log('MySQL Connected');

    connection.query(createRegisterTable, (err) => {
      if (err) {
        console.error('Error creating Register table:', err.message);
        return;
      }
      console.log('Register table created successfully');
    });

    connection.query(createLoginTable, (err) => {
      if (err) {
        console.error('Error creating Login table:', err.message);
        return;
      }
      console.log('Login table created successfully');
    });

    connection.query(createSetupTable, (err) => {
      if (err) {
        console.error('Error creating Setup table:', err.message);
        return;
      }
      console.log('Setup table created successfully');
    });

    connection.query(createWorkoutTable, (err) =>{
      if(err){
        console.error("Error creating workout table: ", err.message);
        return;
      }
      console.log('workout table created sucessfully');
    });

    connection.query(createexercisesTable, (err)=>{
      if(err){
        console.error("Error creating exercise table: ", err.message);
        return;
      }
      console.log('exercise table created sucessfully');
    });
  });
}

initializeDatabase();

module.exports = connection;