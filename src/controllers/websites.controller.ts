import express from "express";

import { Inject, Service } from "typedi";
import { InsertError } from "../common/errors";
import { InternalServerError, NotFoundError } from "../common/errors/http";
import { WebsiteDto } from "../common/types/website-dto.type";
import { Either, isNotOk } from "../common/utils";
import { WebsitesService, WebsitesServiceInterface } from "../services";

@Service()
export class WebsitesController {
  constructor(
    @Inject(WebsitesService.name)
    private readonly websitesService: WebsitesServiceInterface
  ) {}

  async create(req: express.Request): Promise<WebsiteDto> {
    const createWebsiteEither: Either<InsertError, WebsiteDto> =
      await this.websitesService.create(req.body);

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
