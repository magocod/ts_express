interface PaginationRow {
  page: number;
  limit: number;
}

interface Pagination extends PaginationRow {
  total: number;
  totalPages: number;
  next?: PaginationRow;
  previous?: PaginationRow;
}

interface PaginationDetail {
  pagination: Pagination;
  offset: number;
}

export enum PagRow {
  next = "next",
  previous = "previous",
}

export function generatePagination(
  pag: unknown,
  pageSize: unknown
): PaginationDetail {
  // TODO default - values constants
  let page = 1;
  let offset = 0;
  let limit = 3;

  if (pag && pageSize) {
    try {
      // FIXME verify isNaN
      page = parseInt(pag as string);
      limit = parseInt(pageSize as string); // take
      offset = (page - 1) * limit; // skip

      if (offset <= 0) {
        // reset default values
        page = 1;
        offset = 0;
        limit = 3;
      }
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

  return {
    pagination,
    offset,
  };
}

/**
 *
 * @param pagination
 * @param total
 * @param offset
 */
export function generateExtraPagination(
  pagination: Pagination,
  total: number,
  offset: number
): Pagination {
  pagination.total = total;
  pagination.totalPages = Math.ceil(total / pagination.limit);

  if (total > pagination.limit) {
    pagination.next = {
      page: pagination.page + 1,
      limit: pagination.limit,
    };
  }

  if (offset > 0) {
    pagination.previous = {
      page: pagination.page - 1,
      limit: pagination.limit,
    };
  }

  return pagination;
}
