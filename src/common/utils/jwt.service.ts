import { sign } from "jsonwebtoken";
import { join } from "path";
import { readFile } from "fs/promises";

import { Service } from "typedi";
import { ApiError, JwtSignError } from "../errors";
import { Either, ok } from "./either";
import { JwtServiceInterface } from "./jwt-service.interface";
import { notOk } from ".";

@Service(JwtService.name)
export class JwtService implements JwtServiceInterface {
  async sign(): Promise<Either<ApiError, string>> {
    const privateKey: string = await readFile(
      join(__dirname, "../../../jwt/jwtRS256.key"),
      { encoding: "utf8" }
    );

    try {
      return ok<string>(
        sign({ userId: "abc", role: "user" }, privateKey, {
          algorithm: "RS256",
        })
      );
    } catch (error) {
      return notOk<JwtSignError>(new JwtSignError((error as Error).message));
    }
  }
}
