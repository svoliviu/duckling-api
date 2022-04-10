export abstract class ApiError {
  constructor(
    readonly code: string | number,
    readonly message: string,
    readonly details: ErrorPayload | string
  ) {}

  toObject(): ErrorPayload {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
  toString(): string {
    return JSON.stringify(this.toObject());
  }
}

export type ErrorPayload = {
  code: string | number;
  message: string;
  details: ErrorPayload | string;
};
