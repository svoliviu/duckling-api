import { ApiError, ErrorPayload } from "../error";

export class DeleteError extends ApiError {
  constructor(
    readonly message: string,
    readonly details: string | ErrorPayload
  ) {
    super(105, message, details);
  }
}
