import { assert } from "chai";

import supertest from "supertest";

import { CountryId } from "../../src/constants";
import { asyncCreateApp } from "../../src/factory";
import { destroyAll, DataSourceGroup } from "../../src/data_source";

import { chance } from "../fixtures";
import { addQueryString, basicPagination } from "../helpers";
import { PagRow } from "../../src/utils";

const baseRoute = "/categories";

interface RequestData {
  name: string;
  country_id: CountryId;
}

function generateRequest(): RequestData {
  return {
    name: chance.animal(),
    country_id: CountryId.arg,
  };
}

describe("category_crud", function () {
  let httpClient: supertest.SuperTest<supertest.Test>;
  let ds: DataSourceGroup;

  before(async () => {
    const { app, dsg } = await asyncCreateApp();
    ds = dsg;
    httpClient = supertest(app);
  });

  after(async () => {
    // await ds.destroy();
    await destroyAll([ds.argDs, ds.mxDs]);
  });

  describe("findAll", function () {
    it("unfiltered, arg", async function () {
      const response = await httpClient.get(baseRoute);

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });

    it("unfiltered, mx", async function () {
      const qs = basicPagination();
      qs.country_id = CountryId.mx;
      qs.other_key = "pa";
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });


    it("filter by name, arg", async function () {
      const qs = basicPagination();
      qs.name = "bu";
      const response = await httpClient.get(addQueryString(baseRoute, qs));

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
      assert.containsAllKeys(response.body.data.pagination, [PagRow.next]);
    });
  });

  describe("create", function () {
    it("select db, arg", async function () {
      const requestData = generateRequest();
      const response = await httpClient.post(baseRoute).send(requestData);

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
    });

    it("select db, mx", async function () {
      const requestData = generateRequest();
      requestData.country_id = CountryId.mx;
      const response = await httpClient.post(baseRoute).send(requestData);

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 200);
    });

    it("error, unknown db", async function () {
      const requestData = generateRequest();
      requestData.country_id = 2000;
      const response = await httpClient.post(baseRoute).send(requestData);

      // console.log(JSON.stringify(response.body, null, 2));
      assert.equal(response.status, 500);
    });
  });
});
