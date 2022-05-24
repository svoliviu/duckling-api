import express from "express";
import { Inject, Service } from "typedi";
import { ApiError, InternalError } from "../common/errors";
import { InternalServerError } from "../common/errors/http";
import { Either, isNotOk } from "../common/utils";
import {
  VisitsByPage,
  VisitsByPageHourly,
} from "../repositories/aggregated-visits-repository.interface";
import {
  AggregatedVisitsServiceInterface,
  AggregationTime,
} from "../services/aggregated-visits-service.interface";
import { AggregatedVisitsService } from "../services/aggregated-visits.service";

@Service()
export class AggregatesController {
  constructor(
    @Inject(AggregatedVisitsService.name)
    private readonly aggregatedVisitsService: AggregatedVisitsServiceInterface
  ) {}

  async countVisitsByPageHourly(
    req: express.Request
  ): Promise<VisitsByPageHourly[]> {
    const countVisitsByWebsite: Either<ApiError, VisitsByPageHourly[]> =
      await this.aggregatedVisitsService.countVisitsByPageHourly({
        websiteId: req.params.websiteId,
        options: {
          aggregationTime: AggregationTime.hourly,
          startDate: req.query.from as string,
          endDate: req.query.until as string,
        },
      });

    if (isNotOk(countVisitsByWebsite)) {
      throw new InternalServerError(countVisitsByWebsite.notOk.toObject());
    }

    return countVisitsByWebsite.ok;
  }

  async countVisitsByPage(req: express.Request): Promise<VisitsByPage[]> {
    const countVisitsByPage: Either<ApiError, VisitsByPage[]> =
      await this.aggregatedVisitsService.countVisitsByPage({
        websiteId: req.params.websiteId,
        options: {
          startDate: req.query.from as string,
          endDate: req.query.until as string,
        },
      });

    if (isNotOk(countVisitsByPage)) {
      throw new InternalServerError(countVisitsByPage.notOk.toObject());
    }

    return countVisitsByPage.ok;
  }
}
