import { Request, Response } from "express";

class AuthController {
  /**
   *
   * @param req
   * @param res
   */
  public static signup(req: Request, res: Response): void {
    console.log("Register User");
    res.send("Register User");
  }

  /**
   *
   * @param req
   * @param res
   */
  public static login(req: Request, res: Response): void {
    console.log("Login");
    res.send("Login");
  }
}

export default AuthController;
