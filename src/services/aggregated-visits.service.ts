import { Inject, Service } from "typedi";
import { ApiError, InternalError } from "../common/errors";
import { Either, isNotOk, notOk, ok } from "../common/utils";
import {
  AggregatedVisitsRepositoryInterface,
  VisitsByPage,
  VisitsByPageHourly,
} from "../repositories/aggregated-visits-repository.interface";
import { AggregatedVisitsRepository } from "../repositories/aggregated-visits.repository";
import {
  AggregateDto,
  AggregatedVisitsServiceInterface,
} from "./aggregated-visits-service.interface";

@Service(AggregatedVisitsService.name)
export class AggregatedVisitsService
  implements AggregatedVisitsServiceInterface
{
  constructor(
    @Inject(AggregatedVisitsRepository.name)
    private readonly aggregatedVisitsRepository: AggregatedVisitsRepositoryInterface
  ) {}

  async countVisitsByPage(
    criteria: AggregateDto
  ): Promise<Either<ApiError, VisitsByPage[]>> {
    const countVisitsByPage: Either<ApiError, VisitsByPage[]> =
      await this.aggregatedVisitsRepository.countVisitsByPage(criteria);

    if (isNotOk(countVisitsByPage)) {
      return notOk<InternalError>(
        new InternalError(countVisitsByPage.notOk.toObject())
      );
    }

    return countVisitsByPage;
  }

  async countVisitsByPageHourly(
    criteria: AggregateDto
  ): Promise<Either<ApiError, VisitsByPageHourly[]>> {
    const countVisitsByPageHourly: Either<ApiError, VisitsByPageHourly[]> =
      await this.aggregatedVisitsRepository.countVisitsByWebsiteAndPageHourly(
        criteria
      );

    if (isNotOk(countVisitsByPageHourly)) {
      return notOk<InternalError>(
        new InternalError(countVisitsByPageHourly.notOk.toObject())
      );
    }

    return countVisitsByPageHourly;
  }
}
