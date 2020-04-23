import { ReflectSchema, ReflectDoc, ReflectModel } from './constants/symbols';
import { Document, Model as MongooseModel, model } from 'mongoose';
import { Deasync } from './utils/deasync';
import { ReflectKeys } from './constants/reflect.keys';
import { Person } from '../models/person';
import { RecordSchema } from './types';
import { Model } from './model';

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

        const modelCaller = model(schema[prop]?.ref);

        const result = Deasync.execCb.call(modelCaller, modelParent.findById, target[prop]);

        // console.log("Shit?", Model.docToClass.call());
        const type = Reflect.getOwnMetadata(ReflectKeys.Type, target.constructor.prototype, prop);

        return type.docToClass.call(type, result);
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