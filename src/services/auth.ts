import jwt from "jsonwebtoken";
import { User } from "../entity";

import { ResponseLocalUser } from "../interfaces";

import { Request, Response, NextFunction } from "express";

// const rounds = 10;
const tokenSecret = "my-token-secret";

export function generateToken(user: User, secret = tokenSecret): string {
  return jwt.sign({ user: { id: user.id, email: user.email } }, secret, {
    expiresIn: "24h",
  });
}

export function verifyToken(
  token: string
): Promise<string | jwt.JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, function (error, decoded) {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
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
      .json({ message: "please provide a authorization header", error: "" });
  }

  const [key, token] = header.split(" ");
  // console.log(key, token);

  if (key !== "Bearer") {
    return res.status(403).json({
      message: "authorization header does not contain (Bearer)",
      error: "",
    });
  }

  if (!token) {
    return res
      .status(403)
      .json({ message: "please provide a token", error: "" });
  }

  try {
    const result = jwt.verify(token, tokenSecret);
    // const result = await verifyToken(token);

    if (typeof result === "string") {
      return res
        .status(403)
        .json({
          message: "please provide a valid token",
          error: "invalid token content",
        });
    }

    res.locals.user = result.user;
    // ...
  } catch (err) {
    let message = "";
    if (err instanceof Error) {
      message = err.message;
    }
    return res
      .status(403)
      .json({ message: "please provide a valid token", error: message });
  }

  next();
}

export function getResponseLocalUser(res: Response): ResponseLocalUser {
  const user = res.locals.user;

  if (user === undefined || user === null) {
    throw new Error("res.locals.user not set");
  }

  // FIXME type verification
  return user;
}
