import { Either } from "../common/utils";
import { ApiError } from "../common/errors";
import { AccessTokenDto, LoginUserDto, RefreshUserDto } from "../common/types";

export interface AuthServiceInterface {
  login(loginDto: LoginUserDto): Promise<Either<ApiError, AccessTokenDto>>;
  refresh(
    refreshDto: RefreshUserDto
  ): Promise<Either<ApiError, AccessTokenDto>>;
}
