import { ReflectSchema, ReflectDoc, ReflectModel } from './constants/symbols';
import { Document, Model as MongooseModel, model } from 'mongoose';
import { Deasync } from './utils/deasync';
import { ReflectKeys } from './constants/reflect.keys';
import { Person } from '../models/person';
import { ObjectFactory } from './utils/class.instanciator';

/**
 * A Proxy for all getters of model
 *
 * @export
 * @class Proxify
 */
export class Proxify {
  constructor() {
    return new Proxy(this, this);
  }

  public get(target: any, prop: string): Promise<any> {
    if (this.hasOwnProperty(prop)) {
      const schema = Reflect.getMetadata(ReflectSchema, target);
      if (schema[prop]?.ref) {
        const modelParent: MongooseModel<Document> = Reflect.getMetadata(ReflectModel, target);

        // let res = Object.create((global as any)[schema[prop].ref].prototype);
        var res: any = ObjectFactory.create(schema[prop].ref);

        console.log(res)

        const modelCaller = model(schema[prop]?.ref);

        const result = Deasync.execCb.call(modelCaller, modelParent.findById, target[prop]);

        // docToClass
        // console.log("Shit?", Model.docToClass.call());
        return result// = model.findById(target[prop]).exec();
      }
    }

    return target[prop];
  }

  set(target: any, prop: string, value: any, receiver: any): boolean {
    const type = value.constructor

    target[prop] = value;

    return true;
  }
}