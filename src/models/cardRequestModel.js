import pool from "../config/db.js";

export const addCard = async (branchName, cardType, quantity, initiator, cardCharges, batch, status = "pending") => {
    const query = `
      INSERT INTO cards (branch_name, card_type, quantity, initiator, card_charges, batch, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
  
    const values = [branchName, cardType, quantity, initiator, cardCharges, batch, status];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("❌ Error adding card:", error);
      throw error;
    }
  };
  
  export const getAllCardRequestService = async () => {
    const result = await pool.query("SELECT * FROM cards");
    return result.rows;
  };