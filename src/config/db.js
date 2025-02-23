import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the connection string
  ssl: {
    rejectUnauthorized: false, // Required for Render-hosted databases
  },
});

pool.on("connect", () => {
  console.log("Connection pool establised with Database");
});

export default pool;