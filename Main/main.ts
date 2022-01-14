import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";

interface IModuleResolver {
  app: Application;
  plugins: string[];
  getPlugins(): Promise<void>;
  activatePlugins(app: Application): void;
}

class ModuleResolver implements IModuleResolver {
  plugins: string[];
  app: Application;

  constructor(app: Application) {
    this.app = app;
    this.plugins = [];
  }
  async getPlugins(): Promise<void> {
    const decoder: TextDecoder = new TextDecoder("utf-8");
    const data: Uint8Array = await Deno.readFile("plugins.json");
    const parsedData = JSON.parse(decoder.decode(data));

    if (parsedData.hasOwnProperty("plugins")) {
      this.plugins = parsedData.plugins;
    }

    this.activatePlugins(this.app);
  }

  async activatePlugins(app: Application): Promise<void> {
    for (let plugin of this.plugins) {
      //TODO: Dynamic path with module name, error handling
      let { app } = await import("../Main/test.ts");
      app.use(app);
    }
  }
}
