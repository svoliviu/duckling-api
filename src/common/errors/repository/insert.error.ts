import { ApiError, ErrorPayload } from "../error";

export class InsertError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("DB-1", "Failed to insert", details);
  }
}
