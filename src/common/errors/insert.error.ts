import { ApiError } from ".";

export class InsertError extends ApiError {
  constructor(readonly details: string) {
    super("DB-1", "Failed to insert", details);
  }
}
