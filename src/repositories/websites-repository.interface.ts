import { Prisma, Website } from ".prisma/client";
import { PrismaClient } from "../../prisma";
import { Delete, Find, Create } from "../common/interfaces";

export interface WebsitesRepositoryInterface
  extends Create<Prisma.WebsiteCreateInput, Website>,
    Find<Prisma.WebsiteWhereInput, Website>,
    Delete<Prisma.WebsiteWhereUniqueInput, Website> {}
