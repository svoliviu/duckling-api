import { Either } from ".";
import { SignJwtDto } from "..";
import { ApiError } from "../errors";

export interface JwtServiceInterface {
  sign(dto: SignJwtDto): Promise<Either<ApiError, string>>;
}
