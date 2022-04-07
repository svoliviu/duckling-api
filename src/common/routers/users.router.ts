import Container from "typedi";
import express, { NextFunction } from "express";

import { UsersController } from "../../controllers/users.controller";
import { createUserSchema, payloadValidationMiddleware } from "../validation";

const usersRouter = express.Router();

const usersController = Container.get(UsersController);

usersRouter.post(
  "/",
  payloadValidationMiddleware(createUserSchema),
  async (req, res, next: NextFunction) => {
    return res.send(await usersController.create(req));
  }
);

// usersRouter.get("/:id", async (req, res) => {
//   return res.send(await usersController.show(req));
// });

export { usersRouter };
