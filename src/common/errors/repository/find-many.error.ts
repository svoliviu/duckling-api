import { ApiError } from ".";
import { ErrorPayload } from "./error";

export class FindManyError extends ApiError {
  constructor(
    readonly message: string,
    readonly details: string | ErrorPayload
  ) {
    super(104, message, details);
  }
}
