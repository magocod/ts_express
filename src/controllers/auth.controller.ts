import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";
import { getRepository } from "typeorm";
import { User, Token } from "../entity";

import { generateToken } from "../services/auth";

import bcrypt from "bcrypt";

export async function signup(req: Request, res: Response): GenericResponse {
  try {
    // const user = await User.find({   })
    //
    //     if (!user)
    //       res.status(404).json({ error: "no user with that email found" });
    //     else {
    //       bcrypt.compare(req.body.password, user.password, (error, match) => {
    //         if (error) res.status(500).json(error);
    //         else if (match)
    //           res.status(200).json({ token: _generateToken(user) });
    //         else res.status(403).json({ error: "passwords do not match" });
    //       });
    //     }

    return res.json({ message: "...", data: {} });
  } catch (err) {
    let message = "internal error";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(400).send({
      message,
      error: message,
    });
  }
}

export async function login(req: Request, res: Response): GenericResponse {
  try {
    const userRepository = getRepository(User);
    const tokenRepository = getRepository(Token);

    const credentials: { email: string; password: string } = {
      email: req.body.email,
      password: req.body.password,
    };
    // console.log(credentials);

    const user = await userRepository.findOne({
      where: { email: credentials.email },
      select: ["id", "email", "password"],
    });

    // const user = await userRepository.createQueryBuilder()
    //   .where("user.email = :email", { email: credentials.email })
    //   .addSelect("user.password")
    //   .getOne()

    if (user === undefined) {
      return res
        .status(404)
        .json({ message: "...", error: "no user with that email found" });
    }

    // console.log(user);

    const result = await bcrypt.compare(credentials.password, user.password);

    if (!result) {
      return res
        .status(403)
        .json({ message: "...", error: "passwords do not match" });
    }

    const token = generateToken(user);

    const tk = tokenRepository.create({ token, user })
    await tokenRepository.save(tk)

    return res.json({ message: "message", data: { token, tk } });
  } catch (err) {
    // console.log(err);
    let message = "internal error";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(400).send({
      message,
      error: message,
    });
  }
}
