import { Request, Response } from "express";
import { HttpController, GenericResponse } from "../interfaces";

// import { AppDataSource } from "../data-source";
import { dataSourceFactory } from "../data_source";

const AppDataSource = dataSourceFactory();

import { UserRepository } from "../repositories";

import { Profile, User } from "../entity";
import { Repository } from "typeorm";

export class UserController implements HttpController {
  // repositories
  // private _userRepository = AppDataSource.getRepository(User);
  // private _profileRepository = AppDataSource.getRepository(Profile);
  private _userRepository?: Repository<User> = undefined;
  private _profileRepository?: Repository<Profile> = undefined;

  constructor() {
    console.log("AppDataSource.isInitialized", AppDataSource.isInitialized);
  }

  userRepository(): Repository<User> {
    console.log("userRepository", "call");
    if (this._userRepository === undefined) {
      console.log("userRepository", "create");
      this._userRepository = AppDataSource.getRepository(User);
    }
    console.log("userRepository", "reuse");
    return this._userRepository;
  }

  profileRepository(): Repository<Profile> {
    console.log("profileRepository", "call");
    if (this._profileRepository === undefined) {
      console.log("profileRepository", "create");
      this._profileRepository = AppDataSource.getRepository(Profile);
    }
    console.log("profileRepository", "reuse");
    return this._profileRepository;
  }

  async findAll(req: Request, res: Response): GenericResponse {
    try {
      // const result = await this.userRepository().find({
      //   relations: ["photos", "profile"],
      // });
      const result = await UserRepository.findAll(req);
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
      const { email, firstName, lastName, password } = req.body;
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
      console.log(err);
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
      const user = await this.userRepository().findOne({
        where: {
          id: parseInt(req.params.id),
        },
        relations: ["photos", "profile"],
      });

      // active record
      // const user = await User.findOne({
      //   where: { id: parseInt(req.params.id) },
      //   relations: ["photos", "profile"],
      // });

      if (user === null) {
        return res
          .status(404)
          .json({ message: "not found", error: "not found" });
      }

      // console.log(JSON.stringify(user, null, 2));

      this.userRepository().merge(user, req.body);
      const result = await this.userRepository().save(user);
      // const result = await this.userRepository().update({ id: user.id }, req.body);

      // active record
      // user.firstName = req.body.firstName;
      // user.lastName = req.body.lastName;
      // const result = await user.save();

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
