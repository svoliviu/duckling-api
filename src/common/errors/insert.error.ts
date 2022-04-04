import { ApiError } from ".";

export class InsertError extends ApiError {
  constructor(readonly message: string, readonly details: string) {
    super(101, message, details);
  }
}
