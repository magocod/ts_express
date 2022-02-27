import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Transaction } from "../models";

import { callModel } from "../utils";
import { GenericResponse } from "../interfaces";
// import { getModel, Transaction } from "../models";
// const transaction = getModel<typeof Transaction>('Transaction');

type QueryString = { [key: string]: unknown };

interface BasicPagination {
  page: number;
  limit: number;
}

interface Pagination extends BasicPagination {
  total: number;
  totalPages: number;
  next?: BasicPagination;
  previous?: BasicPagination;
}

interface PaginationDetail {
  pagination: Pagination;
  offset: number;
}

function generatePagination(pag: unknown, pageSize: unknown): PaginationDetail {
  // default
  let page = 1;
  let offset = 0;
  let limit = 3;

  if (pag && pageSize) {
    try {
      page = parseInt(pag as string);
      limit = parseInt(pageSize as string);
      offset = (page - 1) * limit;

      // console.log(offset);
      // console.log(limit);
    } catch (e) {
      // pass
    }
  }

  const pagination: Pagination = {
    total: 0,
    totalPages: 0,
    page,
    limit,
  };

  if (offset > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  return {
    pagination,
    offset,
  };
}

function generatePaginationV2(
  pag: unknown,
  pageSize: unknown,
  total: number
): PaginationDetail {
  // default
  let page = 1;
  let offset = 0;
  let limit = 3;

  if (pag && pageSize) {
    try {
      page = parseInt(pag as string);
      limit = parseInt(pageSize as string);
      offset = (page - 1) * limit;

      // console.log(offset);
      // console.log(limit);
    } catch (e) {
      // pass
    }
  }

  const pagination: Pagination = {
    total,
    totalPages: Math.ceil(total / limit),
    page,
    limit,
  };

  if (offset > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  if (total > pagination.limit) {
    pagination.next = {
      page: pagination.page + 1,
      limit: pagination.limit,
    };
  }

  return {
    pagination,
    offset,
  };
}

export async function findAll(req: Request, res: Response): GenericResponse {
  try {
    // const { page, pageSize } = req.query;
    // console.log(req.query);
    //
    // let pag = 1;
    // let offset = 0;
    // let limit = 3;
    //
    // if (page && pageSize) {
    //   try {
    //     pag = parseInt(page as string);
    //     limit = parseInt(pageSize as string);
    //     offset = (pag - 1) * limit;
    //
    //     console.log(offset);
    //     console.log(limit);
    //   } catch (e) {
    //     // pass
    //   }
    // }
    //
    // const data = await Transaction.findAndCountAll({
    //   offset,
    //   limit,
    // });
    //
    // const totalPages = Math.ceil(data.count / limit);
    //
    // return res.json({
    //   page: pag,
    //   limit,
    //   totalPages,
    //   data,
    // });

    const { pagination, offset } = generatePagination(
      req.query.page,
      req.query.limit
    );

    const payload = await Transaction.findAndCountAll({
      offset,
      limit: 1,
    });

    const paginationPayload = generatePaginationV2(
      req.query.page,
      req.query.limit,
      payload.count
    );
    console.log(paginationPayload);

    const { count, rows } = await Transaction.findAndCountAll({
      offset,
      limit: pagination.limit,
    });

    pagination.total = count;
    pagination.totalPages = Math.ceil(count / pagination.limit);

    if (count > pagination.limit) {
      pagination.next = {
        page: pagination.page + 1,
        limit: pagination.limit,
      };
    }

    return res.json({
      pagination,
      data: rows,
    });
  } catch (err) {
    let message = "error cargando las transaccion";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(500).send({
      message,
    });
  }
}

export async function create(req: Request, res: Response): GenericResponse {
  const errors = validationResult(req);
  // console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const reqData = {
    title: req.body.title,
  };

  try {
    console.log(await callModel());
    const data = await Transaction.create(reqData);
    return res.send(data);
  } catch (err) {
    let message = "error creando la transaccion";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(500).send({
      message,
    });
  }
}
