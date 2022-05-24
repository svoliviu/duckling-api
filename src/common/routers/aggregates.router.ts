import Container from "typedi";
import express, { NextFunction } from "express";

import { handleHttpErrors, validateRequestQuery } from "../middleware";
import { timeAggregateParamsSchema } from "../validation";
import { AggregatesController } from "../../controllers/aggregates.controller";

const aggregatesRouter = express.Router();

const aggregatesController = Container.get(AggregatesController);

aggregatesRouter.get(
  "/websites/:websiteId/aggregates/counts/visits-by-page-hourly",
  validateRequestQuery(timeAggregateParamsSchema),

  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await aggregatesController.countVisitsByPageHourly(req));
    } catch (error) {
      next(error);
    }
  },

  handleHttpErrors
);

aggregatesRouter.get(
  "/websites/:websiteId/aggregates/counts/visits-by-page",
  validateRequestQuery(timeAggregateParamsSchema),

  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await aggregatesController.countVisitsByPage(req));
    } catch (error) {
      next(error);
    }
  },

  handleHttpErrors
);

export { aggregatesRouter };
