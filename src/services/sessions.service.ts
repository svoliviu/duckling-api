import { v4 } from "uuid";
import { DateTime } from "luxon";
import { Inject, Service } from "typedi";

import { CacheInterface } from "../common/utils/cache.interface";
import { CacheSetError, InsertError, InternalError } from "../common/errors";
import { Either, isNotOk, notOk, ok, SessionCache } from "../common/utils";
import { CachedSession } from "../common/utils/session-cache/session-cache";
import {
  SessionsRepository,
  SessionsRepositoryInterface,
} from "../repositories";
import { Visit } from "../common/types/visit.type";
import { Session } from "../common/types/session.type";

@Service(SessionsService.name)
export class SessionsService {
  constructor(
    @Inject(SessionCache.name)
    private readonly sessionCache: CacheInterface<CachedSession>,
    @Inject(SessionsRepository.name)
    private readonly sessionsRepository: SessionsRepositoryInterface
  ) {}

  async createOrUpdate(
    visit: Visit
  ): Promise<Either<InternalError, undefined>> {
    // attempt to fetch session from cache
    const getCurrentVisitorSession = this.sessionCache.get(visit.visitorId);

    if (isNotOk(getCurrentVisitorSession)) {
      return notOk<InternalError>(
        new InternalError(getCurrentVisitorSession.notOk.toObject())
      );
    }

    const cachedSession: CachedSession | undefined =
      getCurrentVisitorSession.ok;

    // create a new session if it does not
    // exists in the session cache
    if (!cachedSession) {
      const createSession: Either<InsertError | CacheSetError, Session> =
        await this.createSession(visit);

      if (isNotOk(createSession)) {
        return notOk<InternalError>(
          new InternalError(createSession.notOk.toObject())
        );
      }

      return ok(undefined);
    }

    // delete the current session from cache if no activity for 30 minutes
    // create a new session
    // console.log(cachedSession.lastVisitTs);
    const currentSessionWindowGapInSeconds: number = DateTime.now().diff(
      DateTime.fromISO(cachedSession.lastVisitTs),
      "seconds"
    ).seconds;

    console.log(
      JSON.stringify({
        visitorId: visit.visitorId,
        gap: currentSessionWindowGapInSeconds,
      })
    );

    if (currentSessionWindowGapInSeconds > 30) {
      const deleteCachedSession = this.sessionCache.delete(visit.visitorId);

      if (isNotOk(deleteCachedSession)) {
        return notOk<InternalError>(
          new InternalError(deleteCachedSession.notOk.toObject())
        );
      }

      const createSession: Either<InsertError | CacheSetError, Session> =
        await this.createSession(visit);

      if (isNotOk(createSession)) {
        return notOk<InternalError>(
          new InternalError(createSession.notOk.toObject())
        );
      }

      return ok(undefined);
    }

    // incremet visits count on the current session
    const incVisits: Either<InsertError, undefined> =
      await this.sessionsRepository.incVisits({
        id: cachedSession.id,
      });

    if (isNotOk(incVisits)) {
      return notOk<InternalError>(
        new InternalError(incVisits.notOk.toObject())
      );
    }

    this.refreshCachedSession(visit.visitorId, cachedSession);

    return ok(undefined);
  }

  private refreshCachedSession(
    visitorId: string,
    cachedSession: CachedSession
  ): Either<InternalError, undefined> {
    const deleteCachedSession = this.sessionCache.delete(visitorId);

    if (isNotOk(deleteCachedSession)) {
      return notOk<InternalError>(
        new InternalError(deleteCachedSession.notOk.toObject())
      );
    }

    const cacheSession: Either<CacheSetError, boolean> = this.sessionCache.set(
      visitorId,
      {
        id: cachedSession.id,
        createdAt: cachedSession.createdAt,
        lastVisitTs: DateTime.now().toISO(),
      },
      10800
    );

    if (isNotOk(cacheSession)) {
      return notOk<InternalError>(
        new InternalError(cacheSession.notOk.toObject())
      );
    }

    return ok(undefined);
  }

  private async createSession(
    visit: Visit
  ): Promise<Either<InsertError | CacheSetError, Session>> {
    const createSession: Either<InsertError, Session> =
      await this.sessionsRepository.create({
        id: v4(),
        visitorId: visit.visitorId,
        browser: visit.browser,
        visits: 1,
        os: visit.os,
        device: visit.device,
        createdAt: new Date(),
        updatedAt: null,
        websiteId: visit.websiteId,
      });

    if (isNotOk(createSession)) {
      return createSession;
    }

    const saveToCache: Either<CacheSetError, boolean> = this.sessionCache.set(
      visit.visitorId,
      {
        id: createSession.ok.id,
        lastVisitTs: createSession.ok.createdAt.toISOString(),
        createdAt: createSession.ok.createdAt.toISOString(),
      },
      // max session duration 3h
      10800
    );

    if (isNotOk(saveToCache)) {
      return saveToCache;
    }

    return ok<Session>(createSession.ok);
  }
}
