import "reflect-metadata";

import { App } from "./app";
import {
  authRouter,
  usersRouter,
  websitesRouter,
  visitsRouter,
} from "./src/common";

const app = new App();

const apiVersion = "/v1";

app.registerRouter(apiVersion, authRouter);
app.registerRouter(apiVersion, usersRouter);
app.registerRouter(apiVersion, websitesRouter);
app.registerRouter(apiVersion, visitsRouter);

app.listen(3001);
