import Container from "typedi";
import express, { NextFunction } from "express";

import { loginUserSchema } from "../validation";
import { AuthController } from "../../controllers";
import { handleHttpErrors, validateRequestBody } from "../middleware";

const authRouter = express.Router();

const authController = Container.get(AuthController);

authRouter.post(
  "/auth/login",
  validateRequestBody(loginUserSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await authController.login(req));
    } catch (error) {
      next(error);
    }
  },
  handleHttpErrors
);

authRouter.post(
  "/auth/refresh",
  // payloadValidationMiddleware(loginUserSchema),
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      return res.send(await authController.refresh(req));
    } catch (error) {
      next(error);
    }
  },
  handleHttpErrors
);

export { authRouter };
