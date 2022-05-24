import { ApiError, ErrorPayload } from "../error";

export class CacheDeleteError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("CACHE-03", "Failed to delete item in cache", details);
  }
}
