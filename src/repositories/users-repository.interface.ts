import { Prisma, User } from ".prisma/client";
import { Create } from "../common/interfaces";

export interface UsersRepositoryInterface
  extends Create<Prisma.UserCreateInput, User> {}
