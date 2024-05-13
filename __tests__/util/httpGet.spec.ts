import { httpGet } from "../../src/util/httpGet";

describe("httpGet", () => {
  it("should return the content of the URL", async () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const result = await httpGet(url);
    expect(result).toBeTruthy();
    expect(result).toContain("title");
  });

  it("should return an error message when the URL is invalid", async () => {
    const url = "https://invalid-url";
    await expect(httpGet(url)).rejects.toContain("Error");
  });
});
