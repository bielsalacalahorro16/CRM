import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { IModuleResolver } from "./interfaces/IModuleResolver.ts";
import { log } from "./middleware/logger.ts";
import { Module } from "./types/module.ts";

class ModuleResolver implements IModuleResolver {
  private mainApp: Application;
  private modulesCount: number;
  public registeredModules: Module[];
  private logger: any;

  constructor(app: Application) {
    this.mainApp = app;
    this.modulesCount = 0;
    this.registeredModules = [];
    this.logger = log.getLogger();
  }

  public async mountModules(modules: Module[]): Promise<void> {
    for (const module of modules) {
      try {
        if (this.registeredModules.includes(module)) {
          this.logger.error(`Module: ${module} is already registered.`);
        }

        const path = await Deno.stat(module.Path);
        if (!path.isFile) {
          this.logger.warning(
            `Path: ${path} for module: ${module} is not existing.`,
          );
        }

        const { app } = await import(module.Path);
        if (typeof app === "function") {
          this.mainApp.use(app);
          this.registeredModules.push(module);
          this.logger.info(`Module loaded ${app}`);
        }
      } catch (error) {
        this.logger.error(`Failed loading module: ${error}`);
      }
    }
  }

  public unmountModules(app: Application, module: string) {
    //Module must be type of string, e.g: article.
    //Will search for all the routes which the path starts with the module name and remove them
    //Using the app_router.stack
  }
}
export { ModuleResolver };
