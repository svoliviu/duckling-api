import { Prisma, RefreshToken, User } from ".prisma/client";
import { Create, Find } from "../common/interfaces";

export interface RefreshTokenRepositoryInterface
  extends Create<Prisma.RefreshTokenCreateInput, RefreshToken>,
    Find<Prisma.RefreshTokenWhereInput, RefreshToken & { user: User }> {}
