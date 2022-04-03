import { UniqidTokenGenerator } from "../../../../src/infra/externalServices/UniqidTokenGenerator";

jest.mock("uniqid");
import uniqid from "uniqid";
const mockUniqid = uniqid as jest.MockedFunction<typeof uniqid>;

describe("UniqidTokenGenerator test", () => {
    it("should generate a token", () => {
        mockUniqid.mockReturnValue("iou234io234kljasdas");
        const uniqidTokenGenerator = new UniqidTokenGenerator();

        expect(uniqidTokenGenerator.generateToken()).toBe("iou234io234kljasdas");
    });
});