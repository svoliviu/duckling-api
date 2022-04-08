import express from "express";
import { ApiError } from "../errors";

export const errorHandling = (
  error: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(500).send(error.toObject());
};
