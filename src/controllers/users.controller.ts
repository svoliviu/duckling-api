import express from "express";
import { Inject, Service } from "typedi";

import { Either, isNotOk } from "../common/utils";
import { CreateUserError } from "../common/errors";
import { InternalServerError } from "../common/errors/http";
import { UsersService, UsersServiceInterface } from "../services";
import { UserDto } from "../common";

@Service()
export class UsersController {
  constructor(
    @Inject(UsersService.name)
    private readonly usersService: UsersServiceInterface
  ) {}

  async create(req: express.Request): Promise<UserDto> {
    const createUser: Either<CreateUserError, UserDto> =
      await this.usersService.create({
        email: req.body.email,
        password: req.body.password,
      });

    if (isNotOk(createUser)) {
      console.log(createUser.notOk.toString());
      throw new InternalServerError(createUser.notOk.toString());
    }

    return createUser.ok;
  }
}
