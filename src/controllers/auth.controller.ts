import e from "express";
import express from "express";
import { Inject, Service } from "typedi";
import { AccessTokenDto } from "../common";
import {
  InternalError,
  UserLoginError,
  FindUserError,
  FindRefreshTokenError,
} from "../common/errors";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../common/errors/http";
import { Either, isNotOk } from "../common/utils";

import { AuthService, AuthServiceInterface } from "../services";

@Service()
export class AuthController {
  constructor(
    @Inject(AuthService.name) private readonly authService: AuthServiceInterface
  ) {}

  async login(req: express.Request): Promise<AccessTokenDto> {
    const loginUser: Either<
      FindUserError | UserLoginError | InternalError,
      AccessTokenDto
    > = await this.authService.login({
      email: req.body.email,
      password: req.body.password,
    });

    if (isNotOk(loginUser)) {
      if (loginUser.notOk instanceof FindUserError)
        throw new NotFoundError(loginUser.notOk.toObject());
      else if (loginUser.notOk instanceof UserLoginError)
        throw new BadRequestError(loginUser.notOk.toObject());
      else throw new InternalServerError(loginUser.notOk.toObject());
    }

    return loginUser.ok;
  }

  async refresh(req: express.Request): Promise<AccessTokenDto> {
    const refreshUserAccessTokens: Either<
      FindRefreshTokenError | InternalError,
      AccessTokenDto
    > = await this.authService.refresh({
      refreshToken: req.body.refreshToken,
    });

    if (isNotOk(refreshUserAccessTokens)) {
      if (refreshUserAccessTokens.notOk instanceof FindRefreshTokenError)
        throw new NotFoundError(refreshUserAccessTokens.notOk.toObject());
      else
        throw new InternalServerError(refreshUserAccessTokens.notOk.toObject());
    }

    return refreshUserAccessTokens.ok;
  }
}
