interface User {
  id: number;
  name: string;
}

declare namespace Express {
  export interface Request {
    user: User | null | undefined;
  }
}
