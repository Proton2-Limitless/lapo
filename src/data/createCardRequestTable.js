import pool from "../config/db.js";

const createCardsTable = async () => {
  const createTableQuery = `
    -- Ensure the ENUM type exists
    DO $$ 
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_enum') THEN
            CREATE TYPE status_enum AS ENUM ('pending', 'in_progress', 'ready', 'acknowledge');
        END IF;
    END $$;

    -- Create the cards table
    CREATE TABLE IF NOT EXISTS cards (
        id SERIAL PRIMARY KEY,
        branch_name VARCHAR(255) NOT NULL,
        card_type VARCHAR(100) NOT NULL,
        quantity INT NOT NULL,
        date_requested TIMESTAMP DEFAULT NOW(),
        initiator INT REFERENCES users(id) ON DELETE CASCADE,
        card_charges DECIMAL(10,2) NOT NULL,
        batch VARCHAR(100) NOT NULL,
        status status_enum DEFAULT 'pending'
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("✅ Cards table created/updated successfully.");
  } catch (error) {
    console.error("❌ Error creating cards table:", error);
  }
};

export default createCardsTable;
