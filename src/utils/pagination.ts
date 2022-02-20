const defaultPagination = 3;

export interface PaginationResult {
  limit: number;
  offset: number;
  totalPages: number;
}

export function getPagination(
  page: number,
  limit: number,
  total: number
): PaginationResult {
  const queryLimit = limit ? +limit : defaultPagination;
  const offset = page ? page * limit : 0;

  let totalPages = 1;

  if (isFinite(Math.ceil(total / limit))) {
    totalPages = Math.ceil(total / limit);
  }

  return {
    limit: queryLimit,
    offset,
    totalPages,
  };
}
