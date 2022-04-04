import "reflect-metadata";

import { App } from "./app";
import { websitesRouter } from "./src/common";

const app = new App();

app.registerRouter("/v1/websites", websitesRouter);

app.listen(3001);
