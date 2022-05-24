import knex, { Knex } from "knex";
import { Service } from "typedi";

@Service()
export class KnexClient {
  pg: Knex;
  constructor() {
    this.pg = knex({
      client: "pg",
      connection: process.env.AGGREGATES_DATABASE_URL,
    });
  }
}
