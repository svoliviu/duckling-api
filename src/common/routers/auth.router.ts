import Container from "typedi";
import express, { NextFunction } from "express";

import { errorHandling } from "../middleware";
import { AuthController, UsersController } from "../../controllers";
import { loginUserSchema, payloadValidationMiddleware } from "../validation";

const authRouter = express.Router();

const authController = Container.get(AuthController);

authRouter.post(
  "/login",
  payloadValidationMiddleware(loginUserSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await authController.login(req));
    } catch (error) {
      next(error);
    }
  },
  errorHandling
);

authRouter.post(
  "/refresh",
  // payloadValidationMiddleware(loginUserSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await authController.refresh(req));
    } catch (error) {
      next(error);
    }
  },
  errorHandling
);

export { authRouter };
