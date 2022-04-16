import { User } from "../entity/User";
import { Request } from "express";

import { generatePagination, generateExtraPagination } from "../utils";
import { FindOptionsWhere, ILike } from "typeorm";

// import { AppDataSource } from "../data-source";
import { CountryId } from "../constants";
import { dataSourceFactory } from "../date_source";

const AppDataSource = dataSourceFactory(CountryId.arg);

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findAll(req: Request) {
    const { page, limit } = req.query;
    // console.log(req.query);

    const { profile_name } = req.query;

    const { pagination, offset } = generatePagination(page, limit);

    const where: FindOptionsWhere<User> = {};

    if (profile_name !== undefined && profile_name !== null) {
      where.profile = {
        name: ILike(`%${profile_name}%`),
      };
    }

    const [rows, total] = await this.findAndCount({
      relations: {
        profile: true,
        photos: true,
      },
      where,
      // take: pagination.limit ? pagination.limit : undefined,
      // skip: offset ? offset : undefined,
      take: pagination.limit,
      skip: offset,
    });

    generateExtraPagination(pagination, total, offset);

    return {
      data: rows,
      pagination,
    };
  },
});
