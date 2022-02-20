import { GenericResponse, HttpController } from "@/interfaces";
import { Request, Response } from "express";

import { FilterQuery } from "mongoose";

import { Tutorial, TutorialBase } from "../models";

import { getPagination, PaginationResult } from "../utils";

export class TutorialController implements HttpController {
  async findAll(req: Request, res: Response): GenericResponse {
    try {
      const { title, page, limit } = req.query;
      const condition: FilterQuery<TutorialBase> = {};

      let paginateResult: PaginationResult | null = null;

      if (title) {
        condition.title = {
          $regex: new RegExp(title as string),
          $options: "i",
        };
      }

      const tutorialQuery = Tutorial.find(condition);

      const total = await tutorialQuery.clone().count();

      if (page && limit) {
        paginateResult = getPagination(
          parseInt(page as string),
          parseInt(limit as string),
          total
        );
      }

      tutorialQuery.find(condition);

      if (paginateResult !== null) {
        tutorialQuery.skip(paginateResult.offset).limit(paginateResult.limit);
      }

      // console.log({
      //   page,
      //   ...paginateResult,
      // });

      const tutorials = await tutorialQuery;
      return res.status(200).send(tutorials);
    } catch (err) {
      let message = "unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }

  async create(req: Request, res: Response): GenericResponse {
    try {
      if (!req.body.title) {
        return res.status(400).send({ message: "Content can not be empty!" });
      }

      // Create a Tutorial
      const tutorial = await Tutorial.create({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
      });
      return res.status(200).send(tutorial);
    } catch (err) {
      let message = "unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }

  async find(req: Request, res: Response): GenericResponse {
    try {
      const id = req.params.id;
      const tutorial = await Tutorial.findById(id);

      return res.status(200).send(tutorial);
    } catch (err) {
      let message = "unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }

  async update(req: Request, res: Response): GenericResponse {
    try {
      if (!req.body.title) {
        return res.status(400).send({
          message: "Data to update can not be empty!",
        });
      }

      const id = req.params.id;

      const tutorial = await Tutorial.findById(id);
      if (tutorial === null) {
        return res.status(400).send({
          message: "error",
        });
      }

      tutorial.title = req.body.title;
      tutorial.description = req.body.description;
      tutorial.published = req.body.published;
      await tutorial.save();

      return res.status(200).send(tutorial);
    } catch (err) {
      let message = "unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }

  async delete(req: Request, res: Response): GenericResponse {
    try {
      const id = req.params.id;
      await Tutorial.findByIdAndRemove(id);

      return res.status(200).send({});
    } catch (err) {
      let message = "unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }

  async findAllPublished(req: Request, res: Response): GenericResponse {
    try {
      const { limit } = req.query;
      let queryLimit = 3;

      if (limit !== null && limit !== undefined) {
        queryLimit = parseInt(limit as string);
      }

      const tutorials = await Tutorial.find({ published: true }).limit(
        queryLimit
      );

      return res.status(200).send(tutorials);
    } catch (err) {
      let message = "unknown error";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }
}
