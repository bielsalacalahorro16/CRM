import * as log from "https://deno.land/std@0.119.0/log/mod.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
    file: new log.handlers.FileHandler("WARNING", {
      filename: "./log.txt",
      // you can change format of output message using any keys in `LogRecord`.
      formatter: "{levelName} {msg}",
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console", "file"],
    },
  },
});
const logger = log.getLogger();
export {logger}