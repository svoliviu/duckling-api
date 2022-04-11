import express from "express";
import * as joi from "joi";
import { BadRequestError } from "../errors/http";

export const validateRequestBody = (validationSchema: joi.ObjectSchema) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const validationResult: joi.ValidationResult = validationSchema.validate(
      req.body
    );

    if (validationResult.error) {
      throw new BadRequestError(validationResult.error.message);
    }

    next();
  };
};
