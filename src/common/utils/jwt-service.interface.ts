import { Either } from ".";
import { ApiError } from "../errors";

export interface JwtServiceInterface {
  sign(): Promise<Either<ApiError, string>>;
}
