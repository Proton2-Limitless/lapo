import pool from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
export const getUserByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM users where id = $1", [id]);
  return result.rows[0];
};
export const createUserService = async (name, email,password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email,password) VALUES ($1, $2,$3) RETURNING *",
    [name, email,password]
  );
  return result.rows[0];
};
export const getUserByEmailService = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0]; // Returns user if found, else null
};
export const updateUserService = async (id, name, email) => {
  const fields = [];
  const values = [];
  let query = "UPDATE users SET";

  if (name) {
    fields.push("name = $" + (fields.length + 1));
    values.push(name);
  }
  
  if (email) {
    fields.push("email = $" + (fields.length + 1));
    values.push(email);
  }

  if (fields.length === 0) {
    throw new Error("No fields provided for update");
  }

  query += " " + fields.join(", ") + " WHERE id = $" + (fields.length + 1) + " RETURNING *";
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteUserService = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};