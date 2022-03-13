import { assert, expect } from "chai";

import {
  generatePagination,
  generateExtraPagination,
  PagRow,
} from "../src/utils";

describe("pagination", function () {
  const qsA = {
    page: 1,
    pageSize: 3,
  };
  const payloadA = generatePagination(qsA.page, qsA.pageSize);

  const qsB = {
    page: 2,
    pageSize: 3,
  };
  const payloadB = generatePagination(qsB.page, qsB.pageSize);

  const qsC = {
    page: 0,
    pageSize: 0,
  };
  const payloadC = generatePagination(qsC.page, qsC.pageSize);

  describe("generatePagination", function () {
    it("first page", function () {
      expect(payloadA.offset).to.be.equal(0);
    });

    it("second page", function () {
      expect(payloadB.offset).greaterThan(0);
    });

    it("all parameters equal to 0", function () {
      expect(payloadC.pagination.page).equal(1);
      expect(payloadC.offset).equal(0);
    });

    // page equal to 0
    // limit equal to 0
  });

  describe("generateExtraPagination", function () {
    it("add only next", function () {
      const p = generateExtraPagination(payloadA.pagination, 10, 0);
      assert.property(p, PagRow.next);
      assert.notProperty(p, PagRow.previous);
    });

    it("add only previous", function () {
      const p = generateExtraPagination(
        payloadB.pagination,
        qsB.pageSize,
        payloadB.offset
      );
      assert.property(p, PagRow.previous);
      assert.notProperty(p, PagRow.next);
    });

    it("all rows", function () {
      const p = generateExtraPagination(
        payloadB.pagination,
        qsB.pageSize + 1,
        payloadB.offset
      );
      assert.containsAllKeys(p, [PagRow.previous, PagRow.next]);
    });
  });
});
