import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import { Person } from '../../models/person'

export class MainController implements IControllerBase {
  public path = '/'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/', this.index)
  }

  index = (req: Request, res: Response) => {
    const model = new Person({ name: 'rodrigo', age: 21 });

    // tslint:disable-next-line: no-console
    console.log({ ...model })

    return res.send({
      model,
    });
  }
}