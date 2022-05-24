import { InsertError } from "../common/errors";
import { Create } from "../common/interfaces";
import { SessionWhereUniqueInput } from "../common/types/session-where-unique-input.type";
import { Session } from "../common/types/session.type";
import { Either } from "../common/utils";

export interface SessionsRepositoryInterface extends Create<Session, Session> {
  incVisits(
    where: SessionWhereUniqueInput
  ): Promise<Either<InsertError, undefined>>;
}
