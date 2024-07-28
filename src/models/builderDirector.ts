import { Source } from "./libParam";
import { Library } from "./library";
import { LibraryBuilder } from "./libraryBuilder";

export class BuilderDirector {
  private params = new Map<keyof Library, Source>();
  private builders = new Map<Source, LibraryBuilder>();

  constructor(paramsMap: Map<keyof Library, Source>, builderMap: Map<Source, LibraryBuilder>) {
    this.params = paramsMap;
    this.builders = builderMap;
  }

  async buildLibrary(paramName: keyof Library, library: Library) {
    const source = this.params.get(paramName);
    if (!source) {
      throw new Error(`No param found with name ${paramName}`);
    }
    if(library.sourceStatus.has(source)) {
      return library.sourceStatus.get(source);
    }

    const builder = this.builders.get(source);
    try {
      await builder.addLibraryParams(library);
      library.sourceStatus.set(source, "OK");
      return "OK";
    } catch (error) {
      library.sourceStatus.set(source, "ERROR");
      throw error;
    }
  }
}
