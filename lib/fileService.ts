import { Module } from "./types/module.ts";

class FileService {
  private modules: Module[];

  constructor() {
    this.modules = [];
  }

  private async getConfigFiles(currentPath: string) {
    for await (const dirEntry of Deno.readDir(currentPath)) {
      const entryPath = `${currentPath}/${dirEntry.name}`;
      if (dirEntry.name.toLowerCase() === "module.json") {
        const module: Module = {
          Path: entryPath,
        };
        this.modules.push(module);
      }
      if (dirEntry.isDirectory) {
        await this.getConfigFiles(entryPath);
      }
    }
  }

  public async readConfigFiles() {
    await this.getConfigFiles("");
    for (const module of this.modules) {
      const decoder: TextDecoder = new TextDecoder("utf-8");
      const data: Uint8Array = await Deno.readFile(
        module.Path,
      );

      const parsedData = JSON.parse(decoder.decode(data));
      module.Name = parsedData.file;
      module.Path = module.Path.replace("module.json", parsedData.file);
    }
    return this.modules;
  }
}
export { FileService };
