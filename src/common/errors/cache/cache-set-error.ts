import { ApiError, ErrorPayload } from "../error";

export class CacheSetError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("CACHE-01", "Failed to store item in cache", details);
  }
}
