import { Service } from "typedi";

import { PrismaClient as Prisma } from ".prisma/client";

@Service()
export class PrismaClient extends Prisma {
  constructor() {
    super();
  }
}
