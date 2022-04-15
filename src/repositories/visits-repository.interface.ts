import { Prisma, Visit } from ".prisma/client";
import { Create } from "../common/interfaces";

export interface VisitsRepositoryInterface
  extends Create<Prisma.VisitCreateInput, Visit> {}
