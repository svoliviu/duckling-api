import express, { NextFunction } from "express";
import Container from "typedi";

import { createVisitSchema } from "../validation";
import { VisitsController } from "../../controllers";
import { handleHttpErrors, validateRequestBody } from "../middleware";

const visitsRouter = express.Router();

const visitsController = Container.get(VisitsController);

visitsRouter.post(
  "/visits",
  validateRequestBody(createVisitSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await visitsController.create(req));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  handleHttpErrors
);

export { visitsRouter };
