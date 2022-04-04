import { ApiError } from ".";

export class DeleteError extends ApiError {
  constructor(readonly message: string, readonly details: string) {
    super(105, message, details);
  }
}
