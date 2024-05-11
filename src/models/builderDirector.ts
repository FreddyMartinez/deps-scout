import { LibParam, Source } from "./libParam";
import { Library } from "./library";
import { LibraryBuilder } from "./libraryBuilder";

export class BuilderDirector {
  params = new Map<keyof Library, LibParam>();
  builders = new Map<Source, LibraryBuilder>();

  addBuilder(source: Source, builder: LibraryBuilder) {
    this.builders.set(source, builder);
  }

  addParam(name: keyof Library, param: LibParam) {
    this.params.set(name, param);
  }

  async buildLibrary(paramName: keyof Library, library: Library) {
    const param = this.params.get(paramName);
    if (!param) {
      throw new Error(`No param found with name ${paramName}`);
    }
    if(param.status !== "MISSING") {
      // @TODO: change and validate status
      return;
    }
    const builder = this.builders.get(param.source);
    await builder.addLibraryParams(library);
  }
}
