const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create the pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Function to test the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool
    console.log('Successfully connected to the database!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

// Call the function to test the connection
testConnection();

module.exports = pool;
