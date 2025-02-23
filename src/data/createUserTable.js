import pool from "../config/db.js";

const createUserTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL, 
      created_at TIMESTAMP DEFAULT NOW()
    );`;

  try {
    await pool.query(createTableQuery);
    console.log("✅User table and password column created/updated.");
  } catch (error) {
    console.error("Error setting up users table:", error);
  }
};

export default createUserTable;
