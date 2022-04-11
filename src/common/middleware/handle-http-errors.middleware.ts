import express from "express";
import { ApiError } from "../errors";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/http";

export const handleHttpErrors = (
  error: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof BadRequestError) res.status(400).send(error.toObject());
  else if (error instanceof NotFoundError)
    return res.status(404).send(error.toObject());
  else if (error instanceof UnauthorizedError)
    return res.status(401).send(error.toObject());
  if (error instanceof ForbiddenError) res.status(403).send(error.toObject());
  else return res.status(500).send(error.toObject());
};
