import { Request, Response } from "express";
import { HttpController, GenericResponse } from "../interfaces";

import { getRepository, getCustomRepository } from "typeorm";

import { Profile, User } from "../entity";
import { UserRepository } from "../repositories";

export class UserController implements HttpController {
  async findAll(req: Request, res: Response): GenericResponse {
    try {
      // const users = await getRepository(User).find({
      //   relations: ["photos", "profile"],
      // });
      const result = await getCustomRepository(UserRepository).findAll(req);
      return res.json({ message: "...", data: result });
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

  async create(req: Request, res: Response): GenericResponse {
    try {
      const { firstName, lastName } = req.body;

      const profileRepository = getRepository(Profile);
      const userRepository = getRepository(User);

      const profileBase = profileRepository.create({
        name: "...",
      });
      const profile = await profileRepository.save(profileBase);

      const user = userRepository.create({
        firstName,
        lastName,
        profile,
      });
      const results = await userRepository.save(user);

      return res.json({ message: "...", data: results });
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

  async find(req: Request, res: Response): GenericResponse {
    try {
      const user = await getRepository(User).findOne(req.params.id);
      if (user === undefined) {
        return res
          .status(404)
          .json({ message: "not found", error: "not found" });
      }

      return res.json({ message: "...", data: user });
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

  async update(req: Request, res: Response): GenericResponse {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne(req.params.id, {
        relations: ["photos", "profile"],
      });

      if (user === undefined) {
        return res
          .status(404)
          .json({ message: "not found", error: "not found" });
      }

      userRepository.merge(user, req.body);
      const result = await userRepository.save(user);

      return res.json({ message: "...", data: result });
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

  async delete(req: Request, res: Response): GenericResponse {
    try {
      const result = await getRepository(User).delete(req.params.id);
      // console.log(JSON.stringify(result, null, 2));

      return res.json({ message: "...", data: result });
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
