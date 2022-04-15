import { Visit, Website } from ".prisma/client";
import { Inject, Service } from "typedi";
import { Either, isNotOk, notOk } from "../common/utils";
import { CreateVisitDto, UserAgent } from "../common";
import {
  FindError,
  FindWebsiteError,
  InsertError,
  InternalError,
  UrlProcessingError,
  UserAgentParseError,
} from "../common/errors";
import { DDUserAgentParser } from "../common/utils/dd-user-agent-parser";
import { UserAgentParser } from "../common/utils/user-agent-parser.interface";
import {
  WebsitesRepository,
  WebsitesRepositoryInterface,
} from "../repositories";

import { VisitsServiceInterface } from "./visits-service.interface";
import { VisitsRepository } from "../repositories/visits.repository";
import { VisitsRepositoryInterface } from "../repositories/visits-repository.interface";
import { UrlProcessorInterface } from "../common/utils/url-processor.interface";
import { UrlProcessor } from "../common/utils/url-processor";
import { v4 } from "uuid";

@Service(VisitsService.name)
export class VisitsService implements VisitsServiceInterface {
  constructor(
    @Inject(WebsitesRepository.name)
    private readonly websitesRepository: WebsitesRepositoryInterface,
    @Inject(UrlProcessor.name)
    private readonly urlProcessor: UrlProcessorInterface,
    @Inject(DDUserAgentParser.name)
    private readonly userAgentParser: UserAgentParser,
    @Inject(VisitsRepository.name)
    private readonly visitsRepository: VisitsRepositoryInterface
  ) {}

  async create(
    dto: CreateVisitDto
  ): Promise<Either<FindWebsiteError | InternalError, void>> {
    // prepare the domain in order to identify corresponding website
    const getWebsiteDomain: Either<UrlProcessingError, string> =
      this.urlProcessor.extractDomain(dto.website.url);

    if (isNotOk(getWebsiteDomain)) {
      return notOk<InternalError>(
        new InternalError(getWebsiteDomain.notOk.toObject())
      );
    }

    // attempt to find website by its domain
    const findWebsite: Either<FindError, Website | null> =
      await this.websitesRepository.findOne({ domain: getWebsiteDomain.ok });

    if (isNotOk(findWebsite)) {
      return notOk<InternalError>(
        new InternalError(findWebsite.notOk.toObject())
      );
    }

    if (findWebsite.ok === null) {
      return notOk<FindWebsiteError>(
        new FindWebsiteError("Domain: " + getWebsiteDomain.ok)
      );
    }

    const parseUserAgent: Either<UserAgentParseError, UserAgent> =
      this.userAgentParser.parse(dto.visitor.userAgent);

    if (isNotOk(parseUserAgent)) {
      return notOk<InternalError>(
        new InternalError(parseUserAgent.notOk.toObject())
      );
    }

    // save the visit

    const saveVisit: Either<InsertError, Visit> =
      await this.visitsRepository.create({
        id: v4(),
        path: dto.website.url,
        device: parseUserAgent.ok.device,
        browser: parseUserAgent.ok.browser,
        os: parseUserAgent.ok.os,
        createdAt: new Date(),
        website: {},
      });
  }
}
