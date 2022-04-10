import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class UserLoginError extends ApiError {
  constructor(readonly details: string | ErrorPayload | ErrorPayload) {
    super("EUSER-14", "User Login Error", details);
  }
}
