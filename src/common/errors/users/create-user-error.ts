import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class CreateUserError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EUSER-1", "Failed to create user", details);
  }
}
