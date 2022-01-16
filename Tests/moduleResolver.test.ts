import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { ModuleResolver } from "../Library/Services/moduleResolver.ts";
import { opine } from "https://deno.land/x/opine@2.1.1/mod.ts";

Deno.test("plugin.json is read correctly", async () => {
  const app = opine();
  const resolver = new ModuleResolver(app);

  await resolver.getModules();
  assertEquals(resolver.modules.length, 2);
  assertArrayIncludes(["article", "reservation"], resolver.modules);
});
