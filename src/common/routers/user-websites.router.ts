import express, { NextFunction } from "express";
import Container from "typedi";

import { createWebsiteSchema } from "../validation";
import { UserWebsitesController } from "../../controllers";
import { handleHttpErrors, validateRequestBody } from "../middleware";
import { authenticateRequest } from "../middleware/authenticate-request.middleware";

const websitesRouter = express.Router();

const websitesController = Container.get(UserWebsitesController);

websitesRouter.post(
  "/users/:userId/websites",
  authenticateRequest,
  validateRequestBody(createWebsiteSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await websitesController.create(req));
    } catch (error) {
      next(error);
    }
  },
  handleHttpErrors
);

websitesRouter.get("/:websiteId", async (req, res) => {
  return res.send(await websitesController.show(req));
});

export { websitesRouter };
