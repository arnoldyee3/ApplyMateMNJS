// db.js
const mysql = require('mysql2');

// Set up the connection
const connection = mysql.createConnection({
  host: 'localhost',   // Use 'localhost' if running locally
  user: 'root',        // Your MySQL username (default is 'root')
  password: 'password', // Your MySQL password
  database: 'job_applications'
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting to the database:', err.stack);
    return;
  }
  console.log('connected to the database');
});

module.exports = connection;