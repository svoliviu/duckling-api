require("dotenv").config();

import type { Knex } from "knex";
import { join } from "path";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.AGGREGATES_DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: join(__dirname, "./knex/migrations"),
    },
  },
  production: {
    client: "pg",
    connection: process.env.AGGREGATES_DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: join(__dirname, "./knex/migrations"),
    },
  },
};

module.exports = config;
