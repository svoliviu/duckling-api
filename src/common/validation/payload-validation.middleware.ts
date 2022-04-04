import express from "express";
import * as joi from "joi";

export const payloadValidationMiddleware = (
  validationSchema: joi.ObjectSchema
) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const result: joi.ValidationResult = validationSchema.validate(req.body);

    if (result.error) {
      console.log(result.error);

      return res.status(400).send({
        error: {
          type: "invalid_request_error",
          code: "invalid_payload",
        },
      });
    }

    next();
  };
};
