import { Service } from "typedi";
import { KnexClient } from "../../knex";
import { PrismaClient } from "../../prisma/prisma.client";
import { ApiError, InsertError } from "../common/errors";
import { SessionWhereUniqueInput } from "../common/types/session-where-unique-input.type";
import { Session } from "../common/types/session.type";

import { Either, notOk, ok } from "../common/utils";
import { SessionsRepositoryInterface } from "./sessions-repository.interface";

@Service(SessionsRepository.name)
export class SessionsRepository implements SessionsRepositoryInterface {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly knexClient: KnexClient
  ) {}

  async incVisits(
    where: SessionWhereUniqueInput
  ): Promise<Either<InsertError, undefined>> {
    try {
      await this.knexClient
        .pg<Session>("sessions")
        .where("id", where.id)
        .increment("visits", 1);

      return ok<undefined>(undefined);
    } catch (error) {
      return notOk<InsertError>(new InsertError((error as Error).message));
    }
  }

  async create(data: Session): Promise<Either<ApiError, Session>> {
    try {
      await this.knexClient.pg<Session>("sessions").insert(data);
      const session: Session | undefined = await this.knexClient
        .pg<Session>("sessions")
        .select("*")
        .where("id", data.id)
        .first();

      if (!session) {
        throw new Error("Failed to insert session");
      }

      return ok<Session>(session);
    } catch (error) {
      return notOk<InsertError>(new InsertError((error as Error).message));
    }
  }
}
