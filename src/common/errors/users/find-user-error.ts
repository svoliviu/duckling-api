import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class FindUserError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super("EUSER-12", "User not found error", details);
  }
}
