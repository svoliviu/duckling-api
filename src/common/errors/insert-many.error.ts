import { ApiError } from ".";

export class InsertManyError extends ApiError {
  constructor(readonly message: string, readonly details: string) {
    super(102, message, details);
  }
}
