import { v4 } from "uuid";

import { Website } from ".prisma/client";
import { Inject, Service } from "typedi";

import { CreateWebsiteDto, WebsiteDto } from "../common";

import {
  WebsitesRepository,
  WebsitesRepositoryInterface,
} from "../repositories";

import { WebsitesServiceInterface } from ".";
import { Either, isNotOk, ok } from "../common/utils";
import { FindError, FindManyError, InsertError } from "../common/errors";

@Service(WebsitesService.name)
export class WebsitesService implements WebsitesServiceInterface {
  constructor(
    @Inject(WebsitesRepository.name)
    private readonly websitesRepository: WebsitesRepositoryInterface
  ) {}

  async findOne(id: string): Promise<Either<FindError, WebsiteDto | null>> {
    const findWebsiteEither: Either<FindError, Website | null> =
      await this.websitesRepository.findOne({ id });

    if (isNotOk(findWebsiteEither)) {
      return findWebsiteEither;
    }

    if (findWebsiteEither.ok === null) {
      return ok(findWebsiteEither.ok);
    }

    return ok<WebsiteDto>(this.buildWebsiteDto(findWebsiteEither.ok));
  }

  async findMany(ids: string[]): Promise<Either<FindManyError, WebsiteDto[]>> {
    const findWebsiteEither: Either<FindManyError, Website[]> =
      await this.websitesRepository.findMany({
        id: { in: ids },
      });

    if (isNotOk(findWebsiteEither)) {
      return findWebsiteEither;
    }

    return ok<WebsiteDto[]>(
      findWebsiteEither.ok.map((website: Website) => {
        return this.buildWebsiteDto(website);
      })
    );
  }

  async create(
    createWebsiteDto: CreateWebsiteDto
  ): Promise<Either<InsertError, WebsiteDto>> {
    const insertWebsiteEither: Either<InsertError, Website> =
      await this.websitesRepository.create({
        id: v4(),
        domain: createWebsiteDto.domain,
        name: createWebsiteDto.name,
        createdAt: new Date(),
      });

    if (isNotOk(insertWebsiteEither)) {
      return insertWebsiteEither;
    }

    return ok<WebsiteDto>(this.buildWebsiteDto(insertWebsiteEither.ok));
  }

  private buildWebsiteDto(website: Website): WebsiteDto {
    return {
      id: website.id,
      name: website.name,
      domain: website.domain,
      createdAt: website.createdAt.toISOString(),
    };
  }
}
