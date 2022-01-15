import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";

class ModuleResolver {
  plugins: string[];
  app: Application;

  constructor(app: Application) {
    this.app = app;
    this.plugins = [];
  }

  async getModules(): Promise<void> {
    const decoder: TextDecoder = new TextDecoder("utf-8");
    const data: Uint8Array = await Deno.readFile(
      "/Users/biel.sala/Desktop/CRM/Main/plugins.json",
    );
    const parsedData = JSON.parse(decoder.decode(data));

    if (parsedData.hasOwnProperty("plugins")) {
      this.plugins = parsedData.plugins;
    }
  }

  async activateModules(mainApp: Application): Promise<void> {
    for (const plugin of this.plugins) {
      try {
        const { app } = await import(`../Plugins/${plugin}/${plugin}.ts`);
        mainApp.use(app);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
export { ModuleResolver };
