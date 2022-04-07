import "reflect-metadata";

import { App } from "./app";
import { usersRouter, websitesRouter } from "./src/common";

const app = new App();

app.registerRouter("/v1/websites", websitesRouter);
app.registerRouter("/v1/users", usersRouter);

app.listen(3001);
