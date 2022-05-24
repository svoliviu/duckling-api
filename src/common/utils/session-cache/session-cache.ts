import NodeCache from "node-cache";
import { Service } from "typedi";
import { CacheDeleteError, CacheGetError, CacheSetError } from "../../errors";
import { CacheInterface } from "../cache.interface";
import { Either, notOk, ok } from "../either";

export type CachedSession = {
  id: string;
  createdAt: string;
  lastVisitTs: string;
};

@Service(SessionCache.name)
export class SessionCache implements CacheInterface<CachedSession> {
  private cache: NodeCache;
  constructor() {
    this.cache = new NodeCache({
      // max lifespan for an item
      stdTTL: 86400,
      deleteOnExpire: true,
      checkperiod: 3600,
    });
  }

  set(
    key: string,
    value: CachedSession,
    ttl: number
  ): Either<CacheSetError, boolean> {
    try {
      return ok<boolean>(this.cache.set(key, value, ttl));
    } catch (error) {
      return notOk<CacheSetError>(new CacheSetError((error as Error).message));
    }
  }

  get(key: string): Either<CacheSetError, CachedSession | undefined> {
    try {
      return ok<CachedSession | undefined>(this.cache.get(key));
    } catch (error) {
      return notOk<CacheSetError>(new CacheGetError((error as Error).message));
    }
  }

  delete(key: string): Either<CacheDeleteError, boolean> {
    try {
      const deletedItems: number = this.cache.del(key);

      return ok<boolean>(deletedItems > 0);
    } catch (error) {
      return notOk<CacheDeleteError>(
        new CacheDeleteError((error as Error).message)
      );
    }
  }
}
