import express from "express";
import dayjs from "dayjs";
import { join } from "path";
import { readFileSync } from "fs";
import { JwtPayload, verify } from "jsonwebtoken";

import { ForbiddenError, UnauthorizedError } from "../errors/http";

export const authenticateRequest = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accessToken = req.headers["x-access-token"] as string;

  if (!accessToken) {
    return res
      .status(401)
      .send(
        new UnauthorizedError("An access token must be provided.").toObject()
      );
  }

  const privateKey: string = readFileSync(
    join(__dirname, "../../../jwt/jwtRS256.key"),
    { encoding: "utf8" }
  );

  try {
    const jwtPayload = verify(accessToken, privateKey, {
      algorithms: ["RS256"],
    }) as JwtPayload;
  } catch (error) {
    return res
      .status(403)
      .send(new ForbiddenError("Invalid access token.").toObject());
  }

  next();
};
