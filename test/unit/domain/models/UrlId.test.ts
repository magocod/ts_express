import { UrlIdValidationError } from "../../../../src/domain/errors/UrlIdValidationError";
import { UrlId } from "../../../../src/domain/models/UrlId";

describe("UrlId Tests", () => {
    it("should create an instance of UrlId", () => {
        expect(new UrlId("123qweert3455t6y")).toBeInstanceOf(UrlId);
    });
    it("should throw an error when attempting to create a UrlId that is too short", () => {
        expect(() => new UrlId("sdxc")).toThrow(new UrlIdValidationError("UrlId is too short"));
    });
    it("should return a string representation on the toString method", () => {
        expect(new UrlId("sdxc123123asdasd").toString()).toBe("sdxc123123asdasd");
    });
});
