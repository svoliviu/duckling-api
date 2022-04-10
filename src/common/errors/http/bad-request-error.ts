import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class BadRequestError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super(400, "Bad Request", details);
  }
}
