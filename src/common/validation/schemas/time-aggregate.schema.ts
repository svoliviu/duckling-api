import * as joi from "joi";

export const timeAggregateParamsSchema = joi.object({
  from: joi.date().iso().required(),
  until: joi.date().iso().required(),
  time: joi.string().valid("hourly", "daily"),
});
