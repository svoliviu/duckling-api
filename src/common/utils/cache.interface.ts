import { Either } from ".";
import { CacheDeleteError, CacheGetError, CacheSetError } from "../errors";

export interface CacheInterface<T> {
  set(key: string, value: T, ttl: number): Either<CacheSetError, boolean>;
  get(key: string): Either<CacheGetError, T | undefined>;
  delete(key: string): Either<CacheDeleteError, boolean>;
}
