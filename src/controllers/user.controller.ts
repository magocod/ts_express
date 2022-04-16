import { Request, Response } from "express";
import { HttpController, GenericResponse } from "../interfaces";

import { AppDataSource } from "../data-source";

import { Profile, User } from "../entity";
import { Repository } from "typeorm";

export class UserController implements HttpController {
  // repositories
  // private _userRepository = AppDataSource.getRepository(User);
  // private _profileRepository = AppDataSource.getRepository(Profile);
  private _userRepository?: Repository<User> = undefined;
  private _profileRepository?: Repository<Profile> = undefined;

  private _d = 10

  constructor() {
    console.log(AppDataSource.isInitialized);
  }

  userRepository() {
    console.log(this)
    console.log(AppDataSource.isInitialized);
    console.log("this._userRepository", this._userRepository);
    if (this._userRepository === undefined) {
      this._userRepository = AppDataSource.getRepository(User);
    }
    return this._userRepository;
  }

  profileRepository() {
    console.log(AppDataSource.isInitialized);
    console.log("this._profileRepository", this._profileRepository);
    if (this._profileRepository === undefined) {
      this._profileRepository = AppDataSource.getRepository(Profile);
    }
    return this._profileRepository;
  }

  async findAll(req: Request, res: Response): GenericResponse {
    try {
      const result = await this.userRepository().find({
        relations: ["photos", "profile"],
      });
      // const result = await this.userRepository.findAll(req);
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
    // console.log(this.d)
    try {
      const { email, firstName, lastName, password } = req.body;
      console.log(this)
      const profileBase = this.profileRepository().create({
        name: "...",
      });
      const profile = await this.profileRepository().save(profileBase);

      const user = this.userRepository().create({
        email,
        firstName,
        lastName,
        profile,
        password,
      });
      const results = await this.userRepository().save(user);

      return res.json({ message: "...", data: results });
    } catch (err) {
      console.log(err)
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
      const user = await this.userRepository().findOne({
        where: { id: parseInt(req.params.id) },
      });
      if (user === null) {
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
      // const userRepository = getRepository(User);
      // const user = await userRepository.findOne(req.params.id, {
      //   relations: ["photos", "profile"],
      // });

      const user = await User.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ["photos", "profile"],
      });

      if (user === null) {
        return res
          .status(404)
          .json({ message: "not found", error: "not found" });
      }

      // console.log(JSON.stringify(user, null, 2));

      // userRepository.merge(user, req.body);
      // const result = await userRepository.save(user);
      // const result = await userRepository.update({ id: user.id }, req.body);

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      const result = await user.save();

      // console.log(JSON.stringify(user, null, 2));

      return res.json({ message: "...", data: result });
      // return res.status(500).json({ message: "...", data: {} });
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
      const result = await this.userRepository().delete(req.params.id);
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
