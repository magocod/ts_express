import jwt from "jsonwebtoken";
import { User } from "../entity";

import { Request, Response, NextFunction } from "express";

// const rounds = 10;
const tokenSecret = "my-token-secret";

/**
 *
 * @param user
 */
export function generateToken(user: User): string {
  return jwt.sign({ user: { id: user.id, email: user.email } }, tokenSecret, {
    expiresIn: "24h",
  });
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (header === undefined) {
    return res
      .status(403)
      .json({ error: "please provide a authorization header" });
  }

  const [key, token] = header.split(" ");
  console.log(key, token);

  next();
  // if (!token) res.status(403).json({ error: "please provide a token" });
  // else {
  //   jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
  //     if (err) res.status(400).json({ error: "failed to authenticate token" });
  //     req.user = value?.data;
  //     next();
  //   });
  // }
}
