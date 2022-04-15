import { ApiError, ErrorPayload } from "../error";

export class UrlProcessingError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EURL-01", "Failed to process URL", details);
  }
}
