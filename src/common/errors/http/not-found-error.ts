import { ApiError } from "..";

export class NotFoundError extends ApiError {
  constructor(readonly details: string) {
    super(404, "Not Found", details);
  }
}
