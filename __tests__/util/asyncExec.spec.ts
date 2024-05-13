import { asyncExec } from "../../src/util/asyncExec";

describe("asyncExec function", () => {
  it("should resolve with the stdout of the command", async () => {
    const result = await asyncExec("echo hello");
    expect(result.trim()).toBe("hello");
  });
  
  it("should reject when command is not found", async () => {
    const command = "nocommand";
    try {
      await asyncExec(command);
    } catch (err) {
      expect(err).toContain(command);
    }
  });

  it("should reject with the stderr of the command", async () => {
    await expect(asyncExec("echo hello >&2")).rejects.toContain("hello");
  });
});
