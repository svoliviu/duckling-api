import { ApiError } from "..";

export class InternalServerError extends ApiError {
  constructor(readonly details: string) {
    super(500, "Internal Server Error", details);
  }
}
