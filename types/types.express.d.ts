declare namespace Express {
  interface GenericErrorResponse {
    message: string;
    exception?: unknown;
    code?: number;
  }

  interface Response {
    genericError(value: GenericErrorResponse): this;
  }

  interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profileId: number;
    password: string;
  }

  interface Request {
    user?: User | undefined;
  }
}
