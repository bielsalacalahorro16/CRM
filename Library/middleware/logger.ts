import * as log from "https://deno.land/std@0.119.0/log/mod.ts";

await log.setup({
  handlers: {
    file: new log.handlers.FileHandler("WARNING", {
      filename: "../../log/log.txt",
      formatter: "[{datetime}] {levelName} {msg}",
    }),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console", "file"],
    },
  },
});
const logger = log.getLogger();
export {logger}