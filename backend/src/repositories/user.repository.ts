import { pool } from "../config/database.js";

export async function findAll() {
  const result = await pool.query(
    `
    SELECT id, name, email, created_at
    FROM users
    ORDER BY id
    `    
  );

  return result.rows;
}

export async function findById(id: number) {
  const result = await pool.query(
    `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

export async function findByEmail(email: string) {
  const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
  );

  return result.rows[0];
}

export async function create(
  name: string,
  email: string,
  passwordHash: string
) {
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password_hash)
    VALUES($1, $2, $3)
    RETURNING id, name, email, created_at
    `,
    [name, email, passwordHash]
  );

  return result.rows[0];
}

export async function update(
  id: number,
  name: string,
  email: string
) {
  const result = await pool.query(
    `
    UPDATE users
    SET name = $2,
        email = $3
    WHERE id = $1
    RETURNING id, name, email crated_at
    `,
    [id, name, email]
  );

  return result.rows[0];
}

export async function remove(id: number) {
  await pool.query(
    `
    DELETE
    FROM users
    WHERE id = $1
    `,
    [id]
  );
}
