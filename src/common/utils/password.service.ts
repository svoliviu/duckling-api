import { hash, compare } from "bcrypt";
import { Service } from "typedi";
import { notOk } from ".";

import { ApiError, PasswordCompareError, PasswordHashError } from "../errors";
import { Either, ok } from "./either";
import { PasswordServiceInterface } from "./password-service.interface";

@Service(PasswordService.name)
export class PasswordService implements PasswordServiceInterface {
  async hash(password: string): Promise<Either<PasswordHashError, string>> {
    const saltRounds = 10;

    try {
      return ok<string>(await hash(password, saltRounds));
    } catch (error) {
      return notOk<PasswordHashError>(
        new PasswordHashError((error as Error).message)
      );
    }
  }

  async compare(
    password: string,
    hash: string
  ): Promise<Either<ApiError, boolean>> {
    try {
      return ok<boolean>(await compare(password, hash));
    } catch (error) {
      return notOk<PasswordCompareError>(
        new PasswordCompareError((error as Error).message)
      );
    }
  }
}
