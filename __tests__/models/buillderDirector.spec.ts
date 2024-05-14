import { BuilderDirector } from "../../src/models/builderDirector";
import { Library } from "../../src/models/library";
import { LibraryBuilder } from "../../src/models/libraryBuilder";

const library: Library = {
  name: "test",
  usedVersion: "1.0.0",
  sourceStatus: new Map(),
};

describe("builderDirector", () => {
  it("should contain the builders for the used programming languages", () => {
    const builderDirector = new BuilderDirector();
    const mavenBuilder: LibraryBuilder = {
      addLibraryParams: jest.fn(),
    };

    builderDirector.addBuilder("maven", mavenBuilder);
    expect(builderDirector["builders"].size).toBe(1);
    builderDirector.addParam("repoName", "maven");
    expect(builderDirector["params"].size).toBe(1);

    builderDirector.buildLibrary("repoName", library);
    expect(mavenBuilder.addLibraryParams).toHaveBeenCalledWith(library);
  });
});
