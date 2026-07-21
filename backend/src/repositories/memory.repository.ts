import { pool } from "../config/database.js";

export interface Memory {
  id: string;
  conversation_id: string;
  type: string;
  content: string;
  embedding: number[];
  importance: number;
  metadata: Record<string, unknown>;
  created_at: Date;
}

export interface CreateMemory {
  conversation_id: string;
  type: string;
  content: string;
  embedding: number[];
  importance: number;
  metadata?: Record<string, unknown>; 
}

export async function create(
  input: CreateMemory
): Promise<Memory> {
  const result =
    await pool.query(
      `
        INSERT INTO memories (
          conversation_id,
          type,
          content,
          embedding,
          importance,
          metadata
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        )
        RETURNING *
      `,
      [
        input.conversation_id,
        input.type,
        input.content,
        JSON.stringify(input.embedding),
        input.importance,
        JSON.stringify(input.metadata ?? {}),
      ]
    );
  
  return result.rows[0];
}

export async function findByConversationId(
  conversationId: string
) {
  const result =
    await pool.query(
      `
        SELECT *
        FROM memories
        WHERE conversation_id = $1
        ORDER BY created_at DESC
      `,
      [
        conversationId,
      ]
    );

  return result.rows;
}

export async function findAll():Promise<Memory[]> {
  const result =
    await pool.query(
      `
        SELECT *
        FROM memories
      `
    );

  return result.rows;
}
