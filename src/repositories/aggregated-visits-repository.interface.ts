import { ApiError } from "../common/errors";
import { Either } from "../common/utils";
import { AggregateDto } from "../services/aggregated-visits-service.interface";

export interface AggregatedVisitsRepositoryInterface {
  countVisitsByWebsiteAndPageHourly(
    aggregateDto: AggregateDto
  ): Promise<Either<ApiError, VisitsByPageHourly[]>>;

  countVisitsByPage(
    aggregateDto: AggregateDto
  ): Promise<Either<ApiError, VisitsByPage[]>>;
}

export type VisitsByPageHourly = {
  hour: Date;
} & VisitsByPage;

export type VisitsByPage = {
  path: string;
  websiteId: string;
  visitCount: number;
};
