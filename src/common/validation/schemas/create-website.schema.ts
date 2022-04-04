import * as joi from "joi";

const createWebsiteSchema = joi.object({
  name: joi.string().required(),
  domain: joi.string().uri().required(),
});

export { createWebsiteSchema };
