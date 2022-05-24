import { CreateVisitDto } from "../common";
import { Create } from "../common/interfaces";

export interface VisitsServiceInterface
  extends Create<CreateVisitDto, undefined> {}
