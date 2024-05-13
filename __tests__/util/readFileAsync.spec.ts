import { readFileAsync } from "../../src/util/readFileAsync";

describe("readFileAsync", () => {
  it("should return the content of the file", async () => {
    const path = "package.json";
    const result = await readFileAsync(path, "utf8");
    expect(result).toBeTruthy();
    expect(result).toContain("deps-scout");
  });

  it("should return an error message when the file is not found", async () => {
    const path = "invalid-file.js";
    expect.assertions(2);
    try {
      await readFileAsync(path, "utf8");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toContain("Error reading invalid-file.js");
    }
  });
});
