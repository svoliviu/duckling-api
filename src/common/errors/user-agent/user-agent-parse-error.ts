import { ApiError, ErrorPayload } from "../error";

export class UserAgentParseError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EUA-01", "Failed to parse user agent", details);
  }
}
