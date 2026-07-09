import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable("documents", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    filename: {
      type: "text",
      notNull: true,
    },

    original_name: {
      type: "text",
      notNull: true,
    },

    mime_type: {
      type: "text",
      notNull: true,
    },

    size: {
      type: "integer",
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
  pgm.dropTable("documents");
};
