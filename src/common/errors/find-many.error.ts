import { ApiError } from ".";

export class FindManyError extends ApiError {
  constructor(readonly message: string, readonly details: string) {
    super(104, message, details);
  }
}
