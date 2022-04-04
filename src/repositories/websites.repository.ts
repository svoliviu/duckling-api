import { Service } from "typedi";
import { Prisma, Website } from "@prisma/client";

import { PrismaClient } from "../../prisma";
import { WebsitesRepositoryInterface } from "./websites-repository.interface";
import { Either, notOk, ok } from "../common/utils";
import {
  DeleteError,
  DeleteManyError,
  FindError,
  FindManyError,
  InsertError,
} from "../common/errors";

@Service(WebsitesRepository.name)
export class WebsitesRepository implements WebsitesRepositoryInterface {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(
    data: Prisma.WebsiteCreateInput
  ): Promise<Either<InsertError, Website>> {
    try {
      return ok<Website>(await this.prismaClient.website.create({ data }));
    } catch (error) {
      return notOk<InsertError>(
        new InsertError("Failed to insert Website", (error as Error).message)
      );
    }
  }

  async findOne(
    where: Prisma.WebsiteWhereInput
  ): Promise<Either<FindError, Website | null>> {
    try {
      return ok<Website | null>(
        await this.prismaClient.website.findFirst({ where })
      );
    } catch (error) {
      return notOk<FindError>(
        new FindError("Failed to find Website", (error as Error).message)
      );
    }
  }

  async findMany(
    where: Prisma.WebsiteWhereInput
  ): Promise<Either<FindManyError, Website[]>> {
    try {
      return ok<Website[]>(await this.prismaClient.website.findMany({ where }));
    } catch (error) {
      return notOk<FindManyError>(
        new FindManyError("Failed to find Websites", (error as Error).message)
      );
    }
  }

  async delete(
    where: Prisma.WebsiteWhereUniqueInput
  ): Promise<Either<DeleteError, Website>> {
    try {
      return ok<Website>(await this.prismaClient.website.delete({ where }));
    } catch (error) {
      return notOk<DeleteError>(
        new DeleteError("Failed to delete Website", (error as Error).message)
      );
    }
  }

  deleteMany(
    where: Prisma.WebsiteWhereUniqueInput
  ): Promise<Either<DeleteManyError, Website[]>> {
    throw new Error("Method not implemented.");
  }
}
