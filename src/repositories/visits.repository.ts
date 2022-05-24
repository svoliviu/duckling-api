import knex from "knex";
import { Service } from "typedi";
import { KnexClient } from "../../knex";
import { ApiError, InsertError } from "../common/errors";
import { Visit } from "../common/types/visit.type";
import { Either, notOk, ok } from "../common/utils";
import { VisitsRepositoryInterface } from "./visits-repository.interface";

@Service(VisitsRepository.name)
export class VisitsRepository implements VisitsRepositoryInterface {
  constructor(private readonly knexClient: KnexClient) {}

  async create(data: Visit): Promise<Either<ApiError, Visit>> {
    try {
      await this.knexClient.pg<Visit>("visits").insert(data);
      const visit: Visit | undefined = await this.knexClient
        .pg<Visit>("visits")
        .select("*")
        .where("id", data.id)
        .first();

      if (!visit) {
        throw new Error("Failed to insert visit");
      }

      return ok<Visit>(visit);
    } catch (error) {
      return notOk<InsertError>(new InsertError((error as Error).message));
    }
  }
}
