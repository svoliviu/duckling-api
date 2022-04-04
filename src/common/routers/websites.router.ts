import express, { NextFunction } from "express";
import Container from "typedi";
import { WebsitesController } from "../../controllers";

import { payloadValidationMiddleware } from "../validation/payload-validation.middleware";
import { createWebsiteSchema } from "../validation/schemas/create-website.schema";

const websitesRouter = express.Router();

const websitesController = Container.get(WebsitesController);

websitesRouter.post(
  "/",
  payloadValidationMiddleware(createWebsiteSchema),
  async (req, res, next: NextFunction) => {
    return res.send(await websitesController.create(req));
  }
);

websitesRouter.get("/:id", async (req, res) => {
  return res.send(await websitesController.show(req));
});

export default websitesRouter;
