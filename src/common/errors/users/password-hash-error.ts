import { ApiError } from "..";

export class PasswordHashError extends ApiError {
  constructor(readonly details: string) {
    super("EUSER-10", "Failed to hash password", details);
  }
}
