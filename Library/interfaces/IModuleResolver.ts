import { Application } from "https://deno.land/x/opine@2.1.1/mod.ts";
import {Module} from "../models/module.ts"
interface IModuleResolver extends IBase{
  modules: Module[];
  mainApp: Application;
  getModules(): Promise<void>;
  mountModules(app: Application): Promise<void>;
  unmountModules(app: Application, module: string): Promise<void>;
}
export type {IModuleResolver}