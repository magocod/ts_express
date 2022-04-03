import { SecretValidationError } from "../../../../src/domain/errors/SecretValidationError";
import { Secret } from "../../../../src/domain/models/Secret";

describe("Secret Test", () => {
    it("should create an instance of secret", () => {
        expect(new Secret("mySecret")).toBeInstanceOf(Secret);
    });
    it("should throw an erro when secret is too short", () => {
        expect(() => new Secret("w")).toThrow(new SecretValidationError("Secret is too short"));
    });
    it("should send a secret representation as string in the toString method", () => {
        expect(new Secret("mySecret").toString()).toBe("mySecret");
    });
});