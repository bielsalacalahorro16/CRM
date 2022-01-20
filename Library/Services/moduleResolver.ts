import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { IModuleResolver } from "../interfaces/IModuleResolver.ts";
import { log } from "../middleware/logger.ts";
import { Module } from "../types/module.ts";

class ModuleResolver implements IModuleResolver {
  private modules: Module[];
  private mainApp: Application;
  private modulesCount: number;
  public registeredModules: Module[];
  private logger: any;

  constructor(app: Application) {
    this.mainApp = app;
    this.modules = [];
    this.modulesCount = 0;
    this.registeredModules = [];
    this.logger = log.getLogger();
  }

  private async getConfigFiles(currentPath: string) {
    for await (const dirEntry of Deno.readDir(currentPath)) {
      const entryPath = `${currentPath}/${dirEntry.name}`;
      const splitedFile = dirEntry.name.split(".");
      if (
        splitedFile[0].toLowerCase() === "module" &&
        splitedFile[1].toLowerCase() === "json"
      ) {
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

  private async readConfigFiles() {
    for (const module of this.modules) {
      const decoder: TextDecoder = new TextDecoder("utf-8");
      const data: Uint8Array = await Deno.readFile(
        module.Path,
      );

      const parsedData = JSON.parse(decoder.decode(data));
      module.Name = parsedData.file;
      module.Path = module.Path.replace("module.json", parsedData.file);
    }
  }

  
  public async mountModules(): Promise<void> {
    for (const module of this.modules) {
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

  /**
   * unregister the module from the application
   * @param app - main application.
   * @param module - module to unregister.s
   * @alpha
   */
  public unmountModules(app: Application, module: string) {
    //Module must be type of string, e.g: article.
    //Will search for all the routes which the path starts with the module name and remove them
    //Using the app_router.stack
  }
}
export { ModuleResolver };
