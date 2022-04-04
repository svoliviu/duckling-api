import { ApiError } from "../errors";
import { Either } from "../utils";

export interface Create<T, V> {
  create(dto: T): Promise<Either<ApiError, V>>;
}
