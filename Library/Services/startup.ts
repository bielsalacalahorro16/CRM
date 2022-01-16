import {ModuleResolver} from '../Services/moduleResolver.ts';
import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";


class Startup {

  /**
   * Execute the ModuleResolver class. This method must be run before the app.listen().
   * @alpha
   */
  static async start(app: Application) {
    try {
      const moduleResolver = new ModuleResolver(app);
      await moduleResolver.getModules();
      await moduleResolver.mountModules();

    } catch (error) {
      //Implement error handling
    }
   
  }

}
export {Startup};
