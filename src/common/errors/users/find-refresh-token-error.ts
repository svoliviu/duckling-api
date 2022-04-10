import { ApiError } from "..";

export class FindRefreshTokenError extends ApiError {
  constructor(readonly details: string) {
    super("EUSER-15", "Find Refresh Token Error", details);
  }
}
