import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";
import { Request } from "express";

import { generatePagination, generateExtraPagination } from "../utils";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAll(req: Request) {
    const { page, limit } = req.query;
    // console.log(req.query);

    const { pagination, offset } = generatePagination(page, limit);

    const [rows, total] = await this.findAndCount({
      where: {},
      // take: pagination.limit ? pagination.limit : undefined,
      // skip: offset ? offset : undefined,
      take: pagination.limit,
      skip: offset,
      relations: ["photos", "profile"],
    });

    generateExtraPagination(pagination, total, offset);

    return {
      data: rows,
      pagination,
    };
  }
}
