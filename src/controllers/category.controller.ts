import { Request, Response } from "express";
import { HttpController, GenericResponse } from "../interfaces";

import { CountryId } from "../../src/constants";

import {
  // dataSourceFactory,
  repositoryFactory,
} from "../data_source";

import { Category } from "../entity";

import { generateExtraPagination, generatePagination } from "../utils";

import { FindOptionsWhere, ILike } from "typeorm";

interface CategoryData {
  name: string;
  country_id: CountryId;
}

export class CategoryController implements HttpController {
  async findAll(req: Request, res: Response): GenericResponse {
    try {
      const { page, limit, country_id, name } = req.query;
      // console.log(req.query);

      const where: FindOptionsWhere<Category> = {};

      if (name !== undefined && name !== null) {
        where.name = ILike(`%${name}%`);
      }

      let countryId = CountryId.arg;

      if (country_id !== undefined && country_id !== null) {
        countryId = parseInt(country_id as string);
      }

      const rep = repositoryFactory(Category, countryId);

      const { pagination, offset } = generatePagination(page, limit);

      const [rows, total] = await rep.findAndCount({
        where,
        take: pagination.limit,
        skip: offset,
      });

      generateExtraPagination(pagination, total, offset);

      return res.status(200).json({
        message: "...",
        data: {
          data: rows,
          pagination,
        },
      });
    } catch (err) {
      let message = "...";
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
      const data: CategoryData = req.body;
      // const ds = await dataSourceFactory(data.country_id);
      // // console.log(ds.options);
      // const rep = ds.getRepository(Category);

      const rep = repositoryFactory(Category, data.country_id);

      const category = await rep.create({ name: data.name });
      await rep.save(category);

      return res.status(200).json({ message: "...", data: category });
    } catch (err) {
      let message = "...";
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
      return res.status(500).json({ message: "...", data: {} });
    } catch (err) {
      let message = "...";
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
      return res.status(500).json({ message: "...", data: {} });
    } catch (err) {
      let message = "...";
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
      return res.status(500).json({ message: "...", data: {} });
    } catch (err) {
      let message = "...";
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
