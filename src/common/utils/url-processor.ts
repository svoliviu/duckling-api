import { Service } from "typedi";
import { getBaseUrl } from "get-base-url";
import { Either, notOk, ok } from ".";
import { UrlProcessingError } from "../errors";
import { UrlProcessorInterface } from "./url-processor.interface";

@Service(UrlProcessor.name)
export class UrlProcessor implements UrlProcessorInterface {
  extractDomain(url: string): Either<UrlProcessingError, string> {
    try {
      return ok<string>(getBaseUrl(url));
    } catch (error) {
      return notOk<UrlProcessingError>(
        new UrlProcessingError((error as Error).message)
      );
    }
  }
}
