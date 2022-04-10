import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class PasswordHashError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EUSER-10", "Failed to hash password", details);
  }
}
