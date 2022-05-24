import { ApiError } from "../common/errors";
import { Either } from "../common/utils";
import {
  VisitsByPage,
  VisitsByPageHourly,
} from "../repositories/aggregated-visits-repository.interface";

export interface AggregatedVisitsServiceInterface {
  countVisitsByPageHourly(
    criteria: AggregateDto
  ): Promise<Either<ApiError, VisitsByPageHourly[]>>;

  countVisitsByPage(
    criteria: AggregateDto
  ): Promise<Either<ApiError, VisitsByPage[]>>;
}

export type AggregateDto = {
  websiteId: string;
  options: {
    aggregationTime?: AggregationTime;
    startDate: string;
    endDate: string;
  };
};

export enum AggregationTime {
  hourly,
  daily,
}
