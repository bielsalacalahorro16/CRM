import { log } from "../middleware/logger.ts";

class startup implements IBase {
  logger: any;

  constructor() {
    this.logger = log.getLogger();
  }
 
  /**
   * Exectures the ModuleResolver class. This method must be run before the app.listen().
   * @alpha
   */
  async start() {

  }

}
