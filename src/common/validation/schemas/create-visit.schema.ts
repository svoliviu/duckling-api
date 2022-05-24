import * as joi from "joi";

const createVisitSchema = joi
  .object({
    website: joi
      .object({
        url: joi.string().uri().required(),
      })
      .required(),
    visitor: joi
      .object({
        id: joi.string().uuid().required(),
        display: joi.string().required(),
        referer: joi.string().optional(),
      })
      .required(),
  })
  .required();

export { createVisitSchema };
