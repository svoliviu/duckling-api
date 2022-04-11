import Container from "typedi";
import express, { NextFunction } from "express";

import { UsersController } from "../../controllers";
import { createUserSchema } from "../validation";
import { handleHttpErrors, validateRequestBody } from "../middleware";

const usersRouter = express.Router();

const usersController = Container.get(UsersController);

usersRouter.post(
  "/users",
  validateRequestBody(createUserSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await usersController.create(req));
    } catch (error) {
      next(error);
    }
  },
  handleHttpErrors
);

// usersRouter.get("/:id", async (req, res) => {
//   return res.send(await usersController.show(req));
// });

export { usersRouter };
