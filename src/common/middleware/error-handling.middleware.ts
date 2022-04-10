import express from "express";
import { ApiError } from "../errors";
import { BadRequestError, NotFoundError } from "../errors/http";

export const errorHandling = (
  error: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof BadRequestError) res.status(400).send(error.toObject());
  else if (error instanceof NotFoundError)
    res.status(404).send(error.toObject());
  else res.status(500).send(error.toObject());
};
