import express from "express";

import { Inject, Service } from "typedi";
import { UserDto } from "../common";
import { FindUserError, InsertError, InternalError } from "../common/errors";
import { InternalServerError, NotFoundError } from "../common/errors/http";
import { WebsiteDto } from "../common/types/website-dto.type";
import { Either, isNotOk } from "../common/utils";
import {
  UsersService,
  UsersServiceInterface,
  WebsitesService,
  WebsitesServiceInterface,
} from "../services";

@Service()
export class UserWebsitesController {
  constructor(
    @Inject(WebsitesService.name)
    private readonly websitesService: WebsitesServiceInterface,
    @Inject(UsersService.name)
    private readonly usersService: UsersServiceInterface
  ) {}

  async create(req: express.Request): Promise<WebsiteDto> {
    // validate user
    const findUser: Either<FindUserError | InternalError, UserDto | null> =
      await this.usersService.findOne(req.params.userId);

    if (isNotOk(findUser)) {
      if (findUser.notOk instanceof FindUserError)
        throw new NotFoundError(findUser.notOk.toObject());
      else throw new InternalServerError(findUser.notOk.toObject());
    }

    // create user website
    const createWebsiteEither: Either<InsertError, WebsiteDto> =
      await this.websitesService.create({
        name: req.body.name,
        domain: req.body.domain,
        userId: req.params.userId,
      });

    if (isNotOk(createWebsiteEither)) {
      throw new InternalServerError(createWebsiteEither.notOk.toString());
    }

    return createWebsiteEither.ok;
  }

  async show(req: express.Request): Promise<WebsiteDto | null> {
    const website = await this.websitesService.findOne(req.params.id);

    if (isNotOk(website)) {
      throw new InternalServerError(website.notOk.toString());
    }

    if (website === null) {
      throw new NotFoundError("No website with id: " + req.params.id);
    }

    return website.ok;
  }
}
