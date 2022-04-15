import express, { NextFunction } from "express";
import Container from "typedi";

import { createWebsiteSchema } from "../validation";
import { VisitsController } from "../../controllers";
import { handleHttpErrors, validateRequestBody } from "../middleware";
import { authenticateRequest } from "../middleware/authenticate-request.middleware";

const visitsRouter = express.Router();

const visitsController = Container.get(VisitsController);

visitsRouter.post(
  "/visits",
  validateRequestBody(createWebsiteSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await visitsController.create(req));
    } catch (error) {
      next(error);
    }
  },
  handleHttpErrors
);

export { visitsRouter };
