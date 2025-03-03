const mysql = require('mysql2');

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
      userId INT AUTO_INCREMENT PRIMARY KEY,
      userEmail VARCHAR(100) NOT NULL,
      userPassword VARCHAR(100) UNIQUE NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS Profile (
      profileId INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      fullName VARCHAR(100) NOT NULL,
      age INT,
      FOREIGN KEY (userId) REFERENCES Register(userId) ON DELETE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS Posts (
      postId INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      postContent TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES Register(userId) ON DELETE CASCADE
    );`
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
