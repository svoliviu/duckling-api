import { Service } from "typedi";
import { KnexClient } from "../../knex";
import { ApiError, FindError } from "../common/errors";
import { Either, notOk, ok } from "../common/utils";
import { AggregateDto } from "../services/aggregated-visits-service.interface";
import {
  AggregatedVisitsRepositoryInterface,
  VisitsByPage,
  VisitsByPageHourly,
} from "./aggregated-visits-repository.interface";

@Service(AggregatedVisitsRepository.name)
export class AggregatedVisitsRepository
  implements AggregatedVisitsRepositoryInterface
{
  constructor(private readonly knexClient: KnexClient) {}

  async countVisitsByPage(
    aggregateDto: AggregateDto
  ): Promise<Either<ApiError, VisitsByPage[]>> {
    try {
      const results = await this.knexClient.pg
        .select<VisitsByPage[]>(
          "path",
          "websiteId",
          this.knexClient.pg.raw(`count(*) as "visitCount"`)
        )
        .from("visits")
        .where({ websiteId: aggregateDto.websiteId })
        .andWhereBetween("createdAt", [
          aggregateDto.options.startDate,
          aggregateDto.options.endDate,
        ])
        .groupBy("path", "websiteId")
        .orderBy("visitCount", "desc");
      return ok<VisitsByPage[]>(results);
    } catch (error) {
      return notOk<FindError>(new FindError((error as Error).message));
    }
  }

  async countVisitsByWebsiteAndPageHourly(
    aggregateDto: AggregateDto
  ): Promise<Either<ApiError, VisitsByPageHourly[]>> {
    try {
      const query = await this.knexClient.pg
        .select(
          this.knexClient.pg.raw(
            `time_bucket_gapfill('1 hour', hour) as bucket`
          ),
          this.knexClient.pg.raw(`"websiteId"`),
          "path",
          this.knexClient.pg.raw(`count(*) as "visitCount"`)
        )
        .from("visits_by_website_and_page_hourly")
        .where("websiteId", aggregateDto.websiteId)
        .andWhereBetween("hour", [
          aggregateDto.options.startDate,
          aggregateDto.options.endDate,
        ])
        .groupByRaw(this.knexClient.pg.raw(`bucket, "websiteId", path`));
      return ok<VisitsByPageHourly[]>(query);
    } catch (error) {
      return notOk<FindError>(new FindError((error as Error).message));
    }
  }
}
