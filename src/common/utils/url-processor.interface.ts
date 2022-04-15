import { Either } from ".";
import { ApiError } from "../errors/error";

export interface UrlProcessorInterface {
  extractDomain(url: string): Either<ApiError, string>;
}
