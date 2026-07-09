import { pool } from "../config/database.js";

export async function findAll(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const result = await pool.query(
    `
    SELECT *
    FROM conversations
    ORDER BY updated_at DESC
    LIMIT $1
    OFFSET $2
    `,
    [limit, offset]
  );

  return result.rows;
}

export async function findById(id: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM conversations
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

export async function create(
  title: string
) {
  const result = await pool.query(
    `
    INSERT INTO conversations(title)
    VALUES($1)
    RETURNING *
    `,
    [title]
  );

  return result.rows[0];
}

export async function rename(
  id: string,
  title: string
) {
  const result = await pool.query(
    `
    UPDATE conversations
    SET title = $2,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id, title]
  );

  return result.rows[0];
}

export async function remove(id: string) {
  await pool.query(
    `
    DELETE FROM messages
    WHERE conversation_id = $1
    `,
    [id]
  );

  await pool.query(
    `
    DELETE FROM conversations
    WHERE id = $1
    `,
    [id]
  );
}
