import { Prisma, User } from ".prisma/client";
import { Create, Find } from "../common/interfaces";

export interface UsersRepositoryInterface
  extends Create<Prisma.UserCreateInput, User>,
    Find<Prisma.UserWhereUniqueInput, User> {}
