import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";

import {
  dataSourceFactory,
  // repositoryFactory,
} from "../data_source";

import { generateToken } from "../services/auth";
import { getToken } from "../services/auth-passport";

import { User, Profile, Token } from "../entity";

import bcrypt from "bcrypt";

export class JwtController {
  private userRepository = dataSourceFactory().getRepository(User);
  private profileRepository = dataSourceFactory().getRepository(Profile);
  private tokenRepository = dataSourceFactory().getRepository(Token);

  async signup(req: Request, res: Response): GenericResponse {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(422).json({
          msg: "Please pass username and password.",
          data: null,
        });
      }

      const profileBase = this.profileRepository.create({
        name: "...",
      });
      const profile = await this.profileRepository.save(profileBase);

      const data = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profile,
      };

      const user = await this.userRepository.create(data);
      await this.userRepository.save(user);

      return res.json({ msg: "user created", user });
    } catch (err) {
      let message = "...";
      if (err instanceof Error) {
        message = err.message;
      }

      return res.status(400).send({
        message,
        error: message,
      });
    }
  }

  async login(req: Request, res: Response): GenericResponse {
    try {
      const credentials: { email: string; password: string } = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await this.userRepository.findOne({
        where: { email: credentials.email },
        select: ["id", "email", "password"],
      });

      if (user === null) {
        return res
          .status(404)
          .json({ message: "not found", error: "not found" });
      }

      const result = await bcrypt.compare(credentials.password, user.password);

      if (!result) {
        return res
          .status(403)
          .json({ message: "...", error: "passwords do not match" });
      }

      // if user is found and password is right create a token
      const token = generateToken(user);

      const tk = this.tokenRepository.create({ token, user });
      await this.tokenRepository.save(tk);

      // reassign to not send password
      const userData = await this.userRepository.findOne({
        where: { email: credentials.email },
      });

      return res.json({ message: "...", data: { user: userData, token, tk } });
    } catch (err) {
      let message = "internal error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
        error: message,
      });
    }
  }

  async logout(req: Request, res: Response): GenericResponse {
    try {
      const token = getToken(req.headers);
      // console.log(token);

      if (token === null) {
        return res
          .status(400)
          .json({ message: "...", error: "failed to get header token" });
      }

      const rs = await this.tokenRepository.delete({ token });

      return res.json({ msg: "...", data: rs });
    } catch (err) {
      let message = "internal error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
        error: message,
      });
    }
  }

  async authenticated(req: Request, res: Response): GenericResponse {
    try {
      // const token = getToken(req.headers);
      // console.log(token);

      // console.log(req.user);
      // if (req.user !== undefined) {
      //   req.user.id
      // }

      return res.json({ msg: "...", data: { user: req.user } });
    } catch (err) {
      let message = "internal error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
        error: message,
      });
    }
  }
}
