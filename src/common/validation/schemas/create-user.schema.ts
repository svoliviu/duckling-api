import * as joi from "joi";

const createUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { createUserSchema };
