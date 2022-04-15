import { Prisma, Visit } from ".prisma/client";
import { Service } from "typedi";
import { ApiError } from "../common/errors";
import { Either } from "../common/utils";
import { VisitsRepositoryInterface } from "./visits-repository.interface";

@Service(VisitsRepository.name)
export class VisitsRepository implements VisitsRepositoryInterface {
  create(dto: Prisma.VisitCreateInput): Promise<Either<ApiError, Visit>> {
    throw new Error("Method not implemented.");
  }
}
