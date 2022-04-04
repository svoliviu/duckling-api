import { ApiError } from "../errors";
import { Either } from "../utils";

export interface Delete<T, V> {
  delete(criteria: T): Promise<Either<ApiError, V | null>>;
  deleteMany(criteria: T): Promise<Either<ApiError, V[]>>;
}
