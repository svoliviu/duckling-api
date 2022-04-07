import { ApiError } from "..";

export class CreateUserError extends ApiError {
  constructor(readonly details: string) {
    super("EUSER-1", "Failed to create user", details);
  }
}
