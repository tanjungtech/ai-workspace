import { pool } from "../config/database.js";

type CreateChunkInput = {
  documentId: string;
  chunkIndex: number;
  content: string;
};

type UpdateEmbeddingInput = {
  id: string;
  embedding: number[];
};

export async function createMany(
  chunks: CreateChunkInput[]
) {
  for (const chunk of chunks) {
    await pool.query(
      `
      INSERT INTO document_chunks
      (
        document_id,
        chunk_index,
        content
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      `,
      [
        chunk.documentId,
        chunk.chunkIndex,
        chunk.content,
      ]
    );
  }
}

export async function findByDocumentId(
  documentId: string
) {
  const result = await pool.query(
    `
    SELECT *
    FROM document_chunks
    WHERE document_id = $1
    ORDER BY chunk_index
    `,
    [documentId]
  );
  return result.rows;
}

export async function updateEmbedding(
  input: UpdateEmbeddingInput
) {
  await pool.query(
    `
    UPDATE document_chunks
    SET embedding = $1
    WHERE id = $2
    `,
    [
      JSON.stringify(input.embedding),
      input.id,
    ]
  );
}
