import { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder) => {
  pgm.createExtension("pgcrypto", {
    ifNotExists: true,
  });

  pgm.createTable("conversations", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    title: {
      type: "text",
      notNull: true,
    },

    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },

    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable("conversations");
};
