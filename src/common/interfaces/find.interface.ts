import { ApiError } from "../errors";
import { Either } from "../utils";

export interface Find<T, V> {
  findOne(criteria: T): Promise<Either<ApiError, V | null>>;
  findMany(criteria: T): Promise<Either<ApiError, V[]>>;
}
