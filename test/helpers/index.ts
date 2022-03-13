export type QueryString = { [key: string]: unknown };

/**
 *
 * @param toCheck
 */
export function getAllFunctions(toCheck: unknown): string[] {
  const props: string[] = [];
  let obj = toCheck;
  do {
    props.push(...Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return props.sort().filter((e, i, arr) => {
    if (toCheck !== null || toCheck !== undefined) {
      return false;
    }
    // if (typeof toCheck !== "object") {
    //   return false;
    // }
    if (e != arr[i + 1] && typeof toCheck[e] === "function") {
      return true;
    }
  });
}

export function basicPagination(): QueryString {
  return {
    page: 0,
    limit: 3,
  };
}

/**
 *
 * @param rootUrl
 * @param baseUrl
 * @param params
 */
export function getUriWithParam(
  rootUrl: string,
  baseUrl: string,
  params: QueryString
): string {
  const url = new URL(rootUrl + baseUrl);
  const urlParams = new URLSearchParams(url.search);

  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      urlParams.set(key, params[key] as string);
    }
  }

  url.search = urlParams.toString();
  return url.toString();
}

/**
 *
 * @param baseUrl
 * @param params
 */
export function getRootUriWithParam(
  baseUrl: string,
  params: QueryString
): string {
  return getUriWithParam("http...", baseUrl, params);
}

/**
 *
 * @param route
 * @param ob
 */
export function addQueryString(route: string, ob: QueryString): string {
  const [first, ...others] = Object.keys(ob);
  let qs = route + `?${first}=${ob[first]}`;
  for (const k of others) {
    qs = qs + `&${k}=${ob[k]}`;
  }
  return qs;
}
