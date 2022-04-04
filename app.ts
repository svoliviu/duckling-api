import bodyParser from "body-parser";
import express from "express";

export class App {
  private server: express.Application;

  constructor() {
    this.server = express();
    this.server.use(bodyParser.json());
  }

  registerRouter(path: string, router: express.Router): express.Application {
    return this.server.use(path, router);
  }

  public listen(port: number): void {
    this.server.listen(port, () => {
      console.log("I am listening.");
    });
  }
}
