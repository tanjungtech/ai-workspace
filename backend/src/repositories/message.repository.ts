import { pool } from "../config/database.js";

type CreateMessageInput = {
  conversationId: string;
  role: "system" | "user" | "assistant";
  content: string;
};

export async function findByConversationId(
  conversationId: string
) {
  const result = await pool.query(
    `
    SELECT *
    FROM messages
    WHERE conversation_id = $1
    ORDER BY created_at ASC
    `,
    [conversationId]
  );

  return result.rows;
}

export async function create({
  conversationId,
  role,
  content,
}: CreateMessageInput) {
  const result = await pool.query(
    `
    INSERT INTO messages(
      conversation_id,
      role,
      content
    )
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [conversationId, role, content]
  );

  return result.rows[0];
}

export async function removeByConversationId(
  conversationId: string
) {
  await pool.query(
    `
    DELETE FROM messages
    WHERE conversation_id = $1
    `,
    [conversationId]
  );
}
