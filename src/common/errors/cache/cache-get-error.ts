import { ApiError, ErrorPayload } from "../error";

export class CacheGetError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("CACHE-02", "Failed to get item in cache", details);
  }
}
