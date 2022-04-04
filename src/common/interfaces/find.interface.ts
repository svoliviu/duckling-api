import { ApiError } from "../errors";
import { Either } from "../utils";

export interface Find<T, V> {
  findOne(where: T): Promise<Either<ApiError, V | null>>;
  findMany(where: T): Promise<Either<ApiError, V[]>>;
}
