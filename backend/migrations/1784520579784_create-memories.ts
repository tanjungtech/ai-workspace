import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder) => {
  pgm.createExtension("pgcrypto", {
    ifNotExists: true,
  });

  pgm.createTable("memories", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    conversation_id: {
      type: "uiud",
      notNull: true,
      references: "conversations",
      onDelete: "CASCADE",
    },
    type: {
      type: "text",
      notNull: true,
    },
    content: {
      type: "text",
      notNull: true,
    },
    embedding: {
      type: "jsonb",
      notNull: true,
    },
    importance: {
      type: "real",
      notNull: true,
      default: 0.5,
    },
    metadata: {
      type: "jsonb",
      default: "{}"
    },
    created_at: {
      type: "timestamp",
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
}

export async function down(
  pgm: MigrationBuilder
) {
  pgm.dropTable("memories");
}
