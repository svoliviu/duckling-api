import { hash, compare } from "bcrypt";
import { Service } from "typedi";
import { notOk } from ".";

import { ApiError, PasswordHashError } from "../errors";
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
    throw new Error("Method not implemented.");
  }
}
