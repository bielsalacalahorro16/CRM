import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";
import {Module} from "../types/module.ts"
interface IModuleResolver extends IBase{
  modules: Module[];
  mainApp: Application;
  mountModules(modules: Module[]): Promise<void>;
  unmountModules(app: Application, module: string): Promise<void>;
}
export type {IModuleResolver}