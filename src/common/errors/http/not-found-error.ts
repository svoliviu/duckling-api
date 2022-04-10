import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class NotFoundError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super(404, "Not Found", details);
  }
}
