import { ReflectSchema, ReflectModel, ReflectPivotKey } from './constants/symbols';
import { Document, Model as MongooseModel, model } from 'mongoose';
import { Deasync } from './utils/deasync';
import { ReflectKeys } from './constants/reflect.keys';

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
        // const searchById = Reflect.getOwnMetadata(ReflectPivotKey, target);

        // console.log(searchById)
        // console.log("WTF:", searchById, searchById === true)
        if (target.pivotGetId === true)
          return target[prop];

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

  set(target: any, prop: string, value: any): boolean {

    target[prop] = value;

    return true;
  }
}