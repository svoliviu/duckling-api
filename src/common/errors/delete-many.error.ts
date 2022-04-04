import { ApiError } from ".";

export class DeleteManyError extends ApiError {
  constructor(readonly message: string, readonly details: string) {
    super(106, message, details);
  }
}
