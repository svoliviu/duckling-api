import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class FindWebsiteError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EWEBSITE-01", "Failed to find website", details);
  }
}
