import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class DeleteManyError extends ApiError {
  constructor(
    readonly message: string,
    readonly details: string | ErrorPayload
  ) {
    super(106, message, details);
  }
}
