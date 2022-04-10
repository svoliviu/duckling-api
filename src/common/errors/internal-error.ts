import { ApiError } from ".";
import { ErrorPayload } from "./error";

export class InternalError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EINT", "Internal Error", details);
  }
}
