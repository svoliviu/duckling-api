import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class InternalServerError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super(500, "Internal Server Error", details);
  }
}
