import { Prisma, User } from ".prisma/client";
import { Inject, Service } from "typedi";
import { v4 } from "uuid";
import { ApiError, FindError, InsertError } from "../common/errors";
import { UserDto } from "../common/types";
import { Either, isNotOk, ok, PasswordService } from "../common/utils";
import { PasswordServiceInterface } from "../common/utils/password-service.interface";
import { UsersRepository, UsersRepositoryInterface } from "../repositories";
import { UsersServiceInterface } from "./users-service.interface";

@Service(UsersService.name)
export class UsersService implements UsersServiceInterface {
  constructor(
    @Inject(UsersRepository.name)
    private readonly usersRepository: UsersRepositoryInterface,
    @Inject(PasswordService.name)
    private readonly passwordService: PasswordServiceInterface
  ) {}

  async findOne(id: string): Promise<Either<ApiError, UserDto | null>> {
    const findUser: Either<FindError, User | null> =
      await this.usersRepository.findOne({ id });

    if (isNotOk(findUser)) {
      return findUser;
    }

    if (findUser.ok === null) {
      return ok<null>(findUser.ok);
    }

    return ok<UserDto>(this.buildUserDto(findUser.ok));
  }

  findMany(where: string | string[]): Promise<Either<ApiError, UserDto[]>> {
    throw new Error("Method not implemented.");
  }

  async create(
    createUserDto: Prisma.UserCreateInput
  ): Promise<Either<ApiError, UserDto>> {
    const hashedPassword = await this.passwordService.hash(
      createUserDto.password
    );

    if (isNotOk(hashedPassword)) {
      return hashedPassword;
    }

    const createUser: Either<InsertError, User> =
      await this.usersRepository.create({
        id: v4(),
        email: createUserDto.email,
        password: hashedPassword.ok,
        createdAt: new Date(),
      });

    if (isNotOk(createUser)) {
      return createUser;
    }

    return ok<UserDto>(this.buildUserDto(createUser.ok));
  }

  private buildUserDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
