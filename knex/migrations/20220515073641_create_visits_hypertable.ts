import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("visits", function (table) {
      table.uuid("id").notNullable;
      table.uuid("websiteId").notNullable();
      table.uuid("visitorId").notNullable();
      table.string("path").notNullable();
      table.string("device").notNullable();
      table.string("os").notNullable();
      table.string("browser").notNullable();
      table.datetime("createdAt").notNullable();
    })
    .raw(`SELECT create_hypertable('visits', 'createdAt')`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("visits");
}
