import { Either } from ".";
import { ApiError } from "../errors";

export interface PasswordServiceInterface {
  hash(password: string): Promise<Either<ApiError, string>>;
  compare(password: string, hash: string): Promise<Either<ApiError, boolean>>;
}
