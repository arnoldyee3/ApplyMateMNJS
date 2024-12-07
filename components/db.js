// db.js
import mysql from 'mysql2/promise';

let pool;

const getPool = () => {
  if (!pool) {
    // Initialize the pool only once
    pool = mysql.createPool({
      host: 'sql5.freesqldatabase.com',
      user: 'sql5750355',
      password: 'wsp919t2xI',
      database: 'sql5750355',
      waitForConnections: true, // Wait for a free connection in the pool
      connectionLimit: 10, // Maximum number of connections in the pool
      queueLimit: 0, // Unlimited queueing (can adjust based on needs)
      maxIdle: 0,
      enableKeepAlive: false,
      idleTimeout: 0
    });
  }
  return pool;
};

export { getPool };
