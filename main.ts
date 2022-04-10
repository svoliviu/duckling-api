import "reflect-metadata";

import { App } from "./app";
import { authRouter, usersRouter, websitesRouter } from "./src/common";

const app = new App();

app.registerRouter("/v1/websites", websitesRouter);
app.registerRouter("/v1/users", usersRouter);
app.registerRouter("/v1/auth", authRouter);

app.listen(3001);
