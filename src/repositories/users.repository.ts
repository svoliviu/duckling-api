import { Prisma, User } from ".prisma/client";
import { PrismaClient } from "../../prisma";
import { Service } from "typedi";
import { ApiError, FindError, InsertError } from "../common/errors";
import { Either, notOk, ok } from "../common/utils";
import { UsersRepositoryInterface } from "./users-repository.interface";

@Service(UsersRepository.name)
export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findOne(
    where: Prisma.UserWhereUniqueInput
  ): Promise<Either<ApiError, User | null>> {
    try {
      return ok<User | null>(await this.prismaClient.user.findFirst({ where }));
    } catch (error) {
      return notOk<FindError>(new FindError((error as Error).message));
    }
  }

  findMany(
    where: Prisma.UserWhereUniqueInput
  ): Promise<Either<ApiError, User[]>> {
    throw new Error("Method not implemented.");
  }

  async create(
    data: Prisma.UserCreateInput
  ): Promise<Either<InsertError, User>> {
    try {
      return ok<User>(await this.prismaClient.user.create({ data }));
    } catch (error) {
      return notOk<InsertError>(new InsertError((error as Error).message));
    }
  }
}
