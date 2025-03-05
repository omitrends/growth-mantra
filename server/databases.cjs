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
