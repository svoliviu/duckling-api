import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTable("sessions", function (table) {
      table.uuid("id").notNullable;
      table.uuid("websiteId").notNullable();
      table.uuid("visitorId").notNullable();
      table.integer("visits").defaultTo(0);
      table.string("device").notNullable();
      table.string("os").notNullable();
      table.string("browser").notNullable();
      table.datetime("createdAt").notNullable();
      table.datetime("updatedAt").nullable();
    })
    .raw(`SELECT create_hypertable('sessions', 'createdAt')`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("sessions");
}
