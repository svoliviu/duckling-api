import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class PasswordCompareError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EUSER-11", "Failed to validate password", details);
  }
}
