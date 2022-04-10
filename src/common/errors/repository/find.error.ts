import { ApiError } from "..";
import { ErrorPayload } from "../error";

export class FindError extends ApiError {
  constructor(readonly details: string | ErrorPayload) {
    super(103, "Find Error", details);
  }
}
