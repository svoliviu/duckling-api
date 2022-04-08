import Container from "typedi";
import express, { NextFunction } from "express";

import { errorHandling } from "../middleware";
import { UsersController } from "../../controllers";
import { createUserSchema, payloadValidationMiddleware } from "../validation";

const usersRouter = express.Router();

const usersController = Container.get(UsersController);

usersRouter.post(
  "/",
  payloadValidationMiddleware(createUserSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await usersController.create(req));
    } catch (error) {
      next(error);
    }
  },
  errorHandling
);

// usersRouter.get("/:id", async (req, res) => {
//   return res.send(await usersController.show(req));
// });

export { usersRouter };
