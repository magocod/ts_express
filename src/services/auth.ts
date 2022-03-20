import jwt from "jsonwebtoken";
import { User } from "../entity";

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
