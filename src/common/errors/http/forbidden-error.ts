import { ApiError } from "..";

export class ForbiddenError extends ApiError {
  constructor(readonly details: string) {
    super(403, "Forbidden Error", details);
  }
}
