import { Either } from ".";
import { ApiError } from "../errors";
import { UserAgent } from "../types";

export interface UserAgentParser {
  parse(userAgent: string): Either<ApiError, UserAgent>;
}
