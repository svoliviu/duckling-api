import { RefreshToken, User } from ".prisma/client";
import { Inject, Service } from "typedi";
import { v4 } from "uuid";
import dayjs from "dayjs";
import { LoginUserDto, AccessTokenDto, RefreshUserDto } from "../common";
import {
  ApiError,
  FindError,
  FindRefreshTokenError,
  FindUserError,
  InternalError,
  PasswordCompareError,
  UserLoginError,
} from "../common/errors";
import { Either, isNotOk, notOk, ok, PasswordService } from "../common/utils";
import { JwtServiceInterface } from "../common/utils/jwt-service.interface";
import { JwtService } from "../common/utils/jwt.service";
import { PasswordServiceInterface } from "../common/utils/password-service.interface";
import { UsersRepository, UsersRepositoryInterface } from "../repositories";
import { RefreshTokenRepositoryInterface } from "../repositories/refresh-token-repository.interface";
import { RefreshTokenRepository } from "../repositories/refresh-token.repository";
import { AuthServiceInterface } from "./auth-service.interface";
import { NotFoundError } from "../common/errors/http";

@Service(AuthService.name)
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(JwtService.name) private readonly jwtService: JwtServiceInterface,
    @Inject(PasswordService.name)
    private readonly passwordService: PasswordServiceInterface,
    @Inject(UsersRepository.name)
    private readonly userRepository: UsersRepositoryInterface,
    @Inject(RefreshTokenRepository.name)
    private readonly refreshTokenRepository: RefreshTokenRepositoryInterface
  ) {}

  async login(
    loginDto: LoginUserDto
  ): Promise<
    Either<FindUserError | UserLoginError | InternalError, AccessTokenDto>
  > {
    // validate user
    const user: Either<FindError, User | null> =
      await this.userRepository.findOne({ email: loginDto.email });

    if (isNotOk(user)) {
      return notOk<InternalError>(new InternalError(user.notOk.toObject()));
    }

    if (user.ok === null) {
      return notOk<FindUserError>(
        new FindUserError("User not found. Email: " + loginDto.email)
      );
    }

    // validate user credentials
    const comparePassword: Either<PasswordCompareError, boolean> =
      await this.passwordService.compare(loginDto.password, user.ok.password);

    if (isNotOk(comparePassword)) {
      return notOk<InternalError>(
        new InternalError(comparePassword.notOk.toObject())
      );
    }

    if (comparePassword.ok === false) {
      return notOk<UserLoginError>(new UserLoginError("Bad credentials"));
    }

    // obtain the user access token
    const createAccessToken = await this.jwtService.sign({
      userId: user.ok.id,
      expiresAt: dayjs().add(10, "minutes").format(),
    });

    if (isNotOk(createAccessToken)) {
      return notOk<InternalError>(
        new InternalError(createAccessToken.notOk.toObject())
      );
    }

    // obtain the user refresh token
    const createRefreshToken: Either<ApiError, RefreshToken> =
      await this.refreshTokenRepository.create({
        id: v4(),
        token: v4(),
        createdAt: new Date(),
        expiresAt: dayjs().add(30, "minutes").toDate(),
        user: {
          connect: {
            id: user.ok.id,
          },
        },
      });

    if (isNotOk(createRefreshToken)) {
      return notOk<InternalError>(
        new InternalError(createRefreshToken.notOk.toObject())
      );
    }

    return ok<AccessTokenDto>({
      accessToken: createAccessToken.ok,
      refreshToken: createRefreshToken.ok.token,
    });
  }

  async refresh(
    refreshDto: RefreshUserDto
  ): Promise<Either<FindRefreshTokenError | InternalError, AccessTokenDto>> {
    // validate user refresh token
    const findRefreshToken: Either<
      FindError,
      (RefreshToken & { user: User }) | null
    > = await this.refreshTokenRepository.findOne({
      token: refreshDto.refreshToken,
      expiresAt: { gt: new Date() },
    });

    if (isNotOk(findRefreshToken)) {
      return notOk<InternalError>(
        new InternalError(findRefreshToken.notOk.toObject())
      );
    }

    if (findRefreshToken.ok === null) {
      return notOk<FindRefreshTokenError>(
        new FindRefreshTokenError("Invalid Refresh token.")
      );
    }

    // obtain the new user access token
    const createAccessToken = await this.jwtService.sign({
      userId: findRefreshToken.ok.userId,
      expiresAt: dayjs().add(10, "minutes").format(),
    });

    if (isNotOk(createAccessToken)) {
      return notOk<InternalError>(
        new InternalError(createAccessToken.notOk.toObject())
      );
    }

    // obtain the new user refresh token
    const createRefreshToken: Either<ApiError, RefreshToken> =
      await this.refreshTokenRepository.create({
        id: v4(),
        token: v4(),
        createdAt: new Date(),
        expiresAt: dayjs().add(30, "minutes").toDate(),
        user: {
          connect: {
            id: findRefreshToken.ok.user.id,
          },
        },
      });

    if (isNotOk(createRefreshToken)) {
      return notOk<InternalError>(
        new InternalError(createRefreshToken.notOk.toObject())
      );
    }

    return ok<AccessTokenDto>({
      accessToken: createAccessToken.ok,
      refreshToken: createRefreshToken.ok.token,
    });
  }
}
