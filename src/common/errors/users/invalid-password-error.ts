import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class InvalidPasswordError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EUSER-13", "Invalid Password", details);
  }
}
