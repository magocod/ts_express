import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import User from "../models/user";
import { secret, getToken } from "../config/auth";

class AuthController {
  /**
   *
   * @param req
   * @param res
   */
  public static signup(req: Request, res: Response): void {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: "Please pass username and password." });
    } else {
      const newUser = {
        id: 0,
        email: req.body.email,
        password: req.body.password,
      };
      // save the user
      User.create(newUser)
        .then((user) => {
          res.json({ success: true, msg: "user created", user });
        })
        .catch((e) => {
          res.json({ success: false, msg: "error create", user: null });
        });
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  public static login(req: Request, res: Response): void {
    User.findEmail(req.body.email)
      .then(async (user) => {
        const valid = await User.comparePassword(user, req.body.password);
        if (!valid) {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
        // if user is found and password is right create a token
        const token = jwt.sign(user, secret);
        // return the information including token as JSON
        res.json({ success: true, token: "JWT " + token });
      })
      .catch((e) => {
        res.json({ success: false, msg: "error login", user: null });
      });
  }

  /**
   *
   * @param req
   * @param res
   */
  public static authenticated(req: Request, res: Response): void {
    const token = getToken(req.headers);
    console.log(token);
    if (token) {
      res.json({ success: true, msg: "Successful authenticated" });
    } else {
      res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
}

export default AuthController;
