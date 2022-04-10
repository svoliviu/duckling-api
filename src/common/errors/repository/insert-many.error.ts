import { ApiError } from ".";
import { ErrorPayload } from "./error";

export class InsertManyError extends ApiError {
  constructor(
    readonly message: string,
    readonly details: string | ErrorPayload
  ) {
    super(102, message, details);
  }
}
