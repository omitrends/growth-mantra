const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',            
  user: 'root',                 
  password: '1234',   
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
    WorkoutId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL, 
    WorkoutType ENUM('Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Functional') NOT NULL,
    BodyPart VARCHAR(255) NOT NULL,
    WorkoutDate DATE NOT NULL DEFAULT (CURDATE()),
    FOREIGN KEY (UserId) REFERENCES Register(UserId)
  );
`;

const createExercisesTable = `
  CREATE TABLE IF NOT EXISTS Exercises (
    SetId INT AUTO_INCREMENT PRIMARY KEY,
    WorkoutId INT,
    Exercise VARCHAR(255) NOT NULL,
    Weight DECIMAL(5,2),
    Reps INT,
    Duration DECIMAL(5,2),
    Distance DECIMAL(5,2),
    Calories DECIMAL(6,2),
    Intensity VARCHAR(50),
    FOREIGN KEY (WorkoutId) REFERENCES Workout(WorkoutId)
  );
`;

  const createfoodTable = `
CREATE TABLE IF NOT EXISTS food (
    FoodId INT AUTO_INCREMENT PRIMARY KEY,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack'),
    category ENUM('Fruits', 'Vegetables', 'Grain', 'Protein', 'Dairy', 'Fats'),
    food_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    calories INT NOT NULL,
    FoodDate DATE NOT NULL DEFAULT (CURDATE()), 
    UserId int  , foreign key (UserId) references Register(UserId) 
);
`;
  const createFoodItemsTable = `
CREATE TABLE IF NOT EXISTS fooditems (
    FoodItemId INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(100) UNIQUE NOT NULL,
    calories_per_unit INT NOT NULL,
    FoodId int, foreign key (FoodId) references food(FoodId)
);
`;

const insertFoodItems = `
INSERT INTO fooditems (food_name, calories_per_unit) VALUES
('Rice', 210),
('Chapati', 70),
('Dal', 150),
('Paneer', 265),
('Banana', 89),
('Egg', 78),
('Milk', 120),
('Almonds', 70);
`;

const createJournalTable =`
CREATE TABLE IF NOT EXISTS Journal (
journalId INT AUTO_INCREMENT PRIMARY KEY,
UserId INT NOT NULL,
JournalDate DATE NOT NULL,
Day ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
Mood ENUM('Joy', 'Annoyed', 'Worried', 'Silly', 'Happy', 'Surprised', 'Angry', 'Sleepy', 'Emotional') NOT NULL,
ThingsToDo Text NOT NULL,
Notes Text NOT NULL,
SleepHours INT NOT NULL,
Gratitude TEXT NOT NULL,
Feelings TEXT NOT NULL,
affirmations TEXT NOT NULL,
foreign key (UserId) references Register(UserId)
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

    connection.query(createExercisesTable, (err)=>{
      if(err){
        console.error("Error creating exercise table: ", err.message);
        return;
      }
      console.log('exercise table created sucessfully');
    });

    connection.query(createfoodTable, (err)=>{
      if(err){
        console.error("Error creating Food table: ", err.message);
        return;
      }
      console.log('Food table created sucessfully');
    });

    connection.query(createFoodItemsTable, (err)=>{
      if(err){
        console.error("Error creating Food Items  table: ", err.message);
        return;
      }
      console.log('Food Items table created sucessfully');
    });
    connection.query(insertFoodItems , (err) =>{
      if(err){
        console.error("Error inserting into food table" , err.message);
        return;
      }
      console.log("Food items inserted succesfully");
    });
  });

  connection.query(createJournalTable, (err) => {
    if (err) {
      console.error('Error creating Journal table:', err.message);
      return;
    }
    console.log('Journal table created successfully');
  });
}

initializeDatabase();

module.exports = connection;