import express from "express";

import { Inject, Service } from "typedi";
import { ApiError, FindWebsiteError, InternalError } from "../common/errors";
import { InternalServerError, NotFoundError } from "../common/errors/http";
import { Either, isNotOk } from "../common/utils";
import { VisitsService, VisitsServiceInterface } from "../services";

@Service()
export class VisitsController {
  constructor(
    @Inject(VisitsService.name)
    private readonly visitsService: VisitsServiceInterface
  ) {}

  async create(req: express.Request): Promise<void> {
    const createVisit: Either<ApiError, void> = await this.visitsService.create(
      {
        website: { url: req.body.website.url },
        visitor: {
          id: req.body.visitor.id,
          display: req.body.visitor.display,
          userAgent: req.headers["user-agent"] || "",
          referer: req.body.visitor.referer,
        },
      }
    );

    if (isNotOk(createVisit)) {
      if (createVisit.notOk instanceof FindWebsiteError)
        throw new NotFoundError(createVisit.notOk.toObject());
      else throw new InternalServerError(createVisit.notOk.toObject());
    }
  }
}
