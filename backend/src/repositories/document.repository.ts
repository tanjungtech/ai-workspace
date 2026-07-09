import { pool } from "../config/database.js";

type CreateDocumentInput = {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
};

export async function create(
  document: CreateDocumentInput
) {
  const result =
    await pool.query(
      `
      INSERT INTO documents
      (
        filename,
        original_name,
        mime_type,
        size
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING *
      `,
      [
        document.filename,
        document.originalName,
        document.mimeType,
        document.size,
      ]
    );
  return result.rows[0] ?? null;
}

export async function findAll() {
  const result = await pool.query(
    `
    SELECT *
    FROM documents
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}
  