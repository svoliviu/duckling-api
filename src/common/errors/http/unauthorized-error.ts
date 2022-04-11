import { ApiError } from "..";

export class UnauthorizedError extends ApiError {
  constructor(readonly details: string) {
    super(401, "Unauthorized Error", details);
  }
}
