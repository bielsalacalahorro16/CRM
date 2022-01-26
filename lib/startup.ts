import { ModuleResolver } from "./moduleResolver.ts";
import { FileService } from "./fileService.ts";
import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";

class Startup {
  moduleResolver: ModuleResolver;
  fileService: FileService;
  app: Application;
  constructor(app: Application) {
    this.moduleResolver = new ModuleResolver(app);
    this.fileService = new FileService();
    this.app = app;
  }
  async init() {
    try {
      const modules = await this.fileService.readConfigFiles();
      await this.moduleResolver.mountModules(modules);
    } catch (error) {
      console.error(error);
    }
  }
}
export { Startup };
