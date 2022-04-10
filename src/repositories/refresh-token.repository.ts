import { Prisma, RefreshToken, User } from ".prisma/client";
import { PrismaClient } from "../../prisma";
import { Service } from "typedi";
import { ApiError, FindError, InsertError } from "../common/errors";
import { Either, notOk, ok } from "../common/utils";
import { RefreshTokenRepositoryInterface } from "./refresh-token-repository.interface";

@Service(RefreshTokenRepository.name)
export class RefreshTokenRepository implements RefreshTokenRepositoryInterface {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findOne(
    criteria: Prisma.RefreshTokenWhereInput
  ): Promise<Either<FindError, (RefreshToken & { user: User }) | null>> {
    try {
      return ok<(RefreshToken & { user: User }) | null>(
        await this.prismaClient.refreshToken.findFirst({
          where: criteria,
          include: { user: true },
        })
      );
    } catch (error) {
      return notOk<FindError>(new FindError((error as Error).message));
    }
  }

  findMany(
    criteria: Prisma.RefreshTokenWhereInput
  ): Promise<Either<ApiError, (RefreshToken & { user: User })[]>> {
    throw new Error("Method not implemented.");
  }

  async create(
    data: Prisma.RefreshTokenCreateInput
  ): Promise<Either<ApiError, RefreshToken>> {
    try {
      return ok<RefreshToken>(
        await this.prismaClient.refreshToken.create({ data })
      );
    } catch (error) {
      return notOk<InsertError>(new InsertError((error as Error).message));
    }
  }
}
