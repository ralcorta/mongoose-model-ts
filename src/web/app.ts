import * as express from 'express'
import { Application } from 'express'
import { Server } from 'http'

class App {
  public app: Application
  public port: number

  constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  /**
   *
   *
   * @private
   * @param {{ forEach: (arg0: (middleWare: any) => void) => void; }} middleWares
   * @memberof App
   */
  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    })
  }

  /**
   *
   *
   * @private
   * @param {{ forEach: (arg0: (controller: any) => void) => void; }} controllers
   * @memberof App
   */
  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    })
  }

  /**
   *
   *
   * @returns {Server}
   * @memberof App
   */
  public listen(): Server {
    return this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    })
  }
}

export default App