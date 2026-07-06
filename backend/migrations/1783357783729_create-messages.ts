import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable("messages", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    conversation_id: {
      type: "uuid",
      notNull: true,
      references: "conversations",
      onDelete: "CASCADE"
    },

    role: {
      type: "text",
      notNull: true,
      check: "role IN ('system', 'user', 'assistant')",
    },

    content: {
      type: "text",
      notNull: true,
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable("messages");
};
