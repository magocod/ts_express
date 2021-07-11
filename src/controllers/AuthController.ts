import { Request, Response } from "express";

class AuthController {
  public static signup = (req: Request, res: Response): void => {
    console.log("Registrar Usuario");
    res.send("Register User");
  };

  public static login = (req: Request, res: Response): void => {
    console.log("Inciar Sesion");
    res.send("Inciar Sesion");
  };
}

export default AuthController;
