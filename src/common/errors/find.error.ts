import { ApiError } from ".";

export class FindError extends ApiError {
  constructor(readonly message: string, readonly details: string) {
    super(103, message, details);
  }
}
