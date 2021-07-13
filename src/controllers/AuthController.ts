import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { BasicUser } from "../models/user";

const rounds = 10;
const tokenSecret = "my-token-secret";

/**
 *
 * @param user
 */
function _generateToken(user: BasicUser) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

class AuthController {
  /**
   *
   * @param req
   * @param res
   */
  public static signup(req: Request, res: Response): void {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
      if (error) res.status(500).json(error);
      else {
        const user = { email: req.body.email, password: hash };
        User.create(user)
        res.status(200).json({ token: _generateToken(user) });
      }
    });
  }

  /**
   *
   * @param req
   * @param res
   */
  public static login(req: Request, res: Response): void {
    User.find(req.body.email)
      .then((user) => {
        if (!user)
          res.status(404).json({ error: "no user with that email found" });
        else {
          bcrypt.compare(req.body.password, user.password, (error, match) => {
            if (error) res.status(500).json(error);
            else if (match)
              res.status(200).json({ token: _generateToken(user) });
            else res.status(403).json({ error: "passwords do not match" });
          });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
}

export default AuthController;
