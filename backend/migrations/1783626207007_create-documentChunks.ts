import { MigrationBuilder, PgLiteral } from "node-pg-migrate";
import { parseArgs } from "util";

export const up = (pgm: MigrationBuilder) => {
  pgm.sql("CREATE EXTENSION IF NOT EXISTS vector;");

  pgm.createTable("document_chunks", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    document_id: {
      type: "uuid",
      notNull: true,
      references: "documents",
      onDelete: "CASCADE",
    },

    chunk_index: {
      type: "integer",
      notNull: true,
    },

    embedding: {
      type: 'vector(1536)',
      notNull: false,
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
  pgm.dropTable("document_chunks");
};
