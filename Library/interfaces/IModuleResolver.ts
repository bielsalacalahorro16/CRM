import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";

interface IModuleResolver extends IBase{
  modules: string[];
  mainApp: Application;
  getModules(): Promise<void>;
  mountModules(app: Application): Promise<void>;
  unmountModules(app: Application, module: string): Promise<void>;
}
export type {IModuleResolver}